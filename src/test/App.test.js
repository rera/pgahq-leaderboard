import React from 'react'
import ReactModal from 'react-modal'
import { shallow, mount } from 'enzyme'

import api from '../data/api'
import playersMock from '../data/db.json'
import Player from '../Player'

import App from '../App'
import Leaderboard from '../components/Leaderboard'
import LeaderboardRow from '../components/LeaderboardRow'
import NewPlayerForm from '../components/NewPlayerForm'
import DeleteConfirmation from '../components/DeleteConfirmation'

describe('App', () => {
  let wrap = {}
  beforeEach(async () => {
    jest.spyOn(api, 'allPlayers').mockImplementation(() => {
      return playersMock.reduce((a, p) => {
        a.push(new Player(p.id, p.firstName, p.lastName, p.score))
        return a
      }, [])
    })
    jest.spyOn(api, 'deletePlayer').mockImplementation((id) => {
      return {id: id}
    })
    jest.spyOn(api, 'createPlayer').mockImplementation((p) => {
      return new Player(
        ~~(Math.random() * 9999) + 8999,
        p.firstName, p.lastName, p.score
      )
    })

    wrap = await mount(<App />)
    wrap.update()
  })
  afterEach(() => {
    api.allPlayers.mockClear()
    api.deletePlayer.mockClear()
    api.createPlayer.mockClear()
    wrap = {}
  })

  it('renders without crashing', () => {
    wrap.find(Leaderboard)
    expect(wrap.length).toEqual(1)
  })

  it('has data', () => {
    const players = wrap.state('data')
    expect(players.length).toBeGreaterThan(0)
  })

  describe('Leaderboard', () => {
    it('has correct row count', () => {
      const players = wrap.state('data')
      const leaderboard = wrap.find(Leaderboard).first()
      expect(leaderboard.find(LeaderboardRow).length).toEqual(players.length)
    })

    it('is sorted correctly', () => {
      const leaderboard = wrap.find(Leaderboard).first()
      const players = wrap.find(LeaderboardRow).map(node => node.props().player)
      expect(players).toBeSortedByScoreAndLastName()
    })
  })

  describe('LeaderboardRow', () => {
    it('renders name in correct format', () => {
      const row = wrap.find(LeaderboardRow).first()
      const player = row.props().player
      expect(wrap.find('td').first().text()).toEqual(player._name._lastName + ', ' + player._name._firstName)
    })

    it('has a modal', () => {
      const row = wrap.find(LeaderboardRow).first()
      const confirm = row.find(DeleteConfirmation)
      expect(confirm.find(ReactModal).length).toEqual(1)
    })

    it('has closed modal by default', () => {
      const row = wrap.find(LeaderboardRow).first()
      const confirm = row.find(DeleteConfirmation)
      expect(confirm.find(ReactModal).prop('isOpen')).toEqual(false)
    })

    it('opens modal when delete button is clicked', async () => {
      const row = wrap.find(LeaderboardRow).first()
      await row.find('button').simulate('click')
      expect(wrap.find(LeaderboardRow).first().find(ReactModal).prop('isOpen')).toEqual(true)
    })

    it('can delete player', async () => {
      const players = wrap.state('data')
      const playersCount = players.length
      const leaderboard = wrap.find(Leaderboard).first()

      const rows = leaderboard.find(LeaderboardRow)
      const randomRow = rows.at(~~(rows.length * Math.random()))
      const deletingName = randomRow.props().player.name

      randomRow.find('td.delete button').simulate('click')
      await wrap.find('form').simulate('submit')
      wrap.update()

      const newPlayersCount = wrap.state('data').length
      const newLeaderboard = wrap.find(Leaderboard).first()
      const newPlayers = newLeaderboard.map(node => node.props().player)

      // state shows correct count
      expect(newPlayersCount).toEqual(playersCount - 1)
      // leaderboard shows correct count
      expect(newLeaderboard.find(LeaderboardRow).length).toEqual(newPlayersCount)
      // correct player is removed
      expect(newLeaderboard.text()).not.toContain(deletingName)
      // leaderboard remains correctly sorted
      expect(newPlayers).toBeSortedByScoreAndLastName()
    })
  })

  describe('NewPlayerForm', () => {
    it('has a modal', () => {
      const wrap = shallow( <NewPlayerForm /> )
      expect(wrap.find(ReactModal).length).toEqual(1)
    })

    it('has closed modal by default', () => {
      const wrap = shallow( <NewPlayerForm /> )
      expect(wrap.find(ReactModal).prop('isOpen')).toEqual(false)
    })

    it('opens modal when add button is clicked', () => {
      const wrap = shallow( <NewPlayerForm /> )
      wrap.find('button:not(.cancel)').simulate('click')
      expect(wrap.find(ReactModal).prop('isOpen')).toEqual(true)
    })

    it('renders blank form when modal is open', () => {
      const wrap = mount( <NewPlayerForm /> )
      wrap.find('button').simulate('click')
      // form exists
      expect(wrap.find('form').length).toEqual(1)
      // fields are blank
      expect(wrap.state('firstName')).toBe('')
      expect(wrap.state('lastName')).toBe('')
      expect(wrap.state('score')).toBe('')
    })

    it('can add player', async () => {
      const players = wrap.state('data')
      const playersCount = players.length
      const newPlayerForm = wrap.find(NewPlayerForm)
      newPlayerForm.find('button:not(.cancel)').simulate('click')

      const newPlayer = {
        firstName: 'John',
        lastName: 'Doe',
        score: 99
      }

      newPlayerForm.setState(newPlayer)
      await wrap.find('form').simulate('submit')
      wrap.update()

      const newPlayersCount = wrap.state('data').length
      const newLeaderboard = wrap.find(Leaderboard).first()
      const newPlayers = newLeaderboard.map(node => node.props().player)

      // state shows correct count
      expect(newPlayersCount).toEqual(playersCount + 1)
      // leaderboard shows correct count
      expect(newLeaderboard.find(LeaderboardRow).length).toEqual(newPlayersCount)
      // correct player is added
      expect(newLeaderboard.text()).toContain(newPlayer.lastName + ', ' + newPlayer.firstName)
      // leaderboard remains correctly sorted
      expect(newPlayers).toBeSortedByScoreAndLastName()
      // modal is closed
      expect(newPlayerForm.find(ReactModal).prop('isOpen')).toEqual(false)
    })
  })
})

expect.extend({
  toBeSortedByScoreAndLastName (received) {
    const pass = this.equals(received,
      received.concat().sort((a, b) => {
        if (a.score === b.score) {
          return ([b.name, a.name].sort())[0] === b.name ? 1 : -1
        }
        return a.score < b.score ? 1 : -1
      })
    )
    if (pass) {
      return { message: () => (`expected ${this.utils.printReceived(received)} to be sorted by score desc and player asc`), pass: true }
    } else {
      return { message: () => (`expected ${this.utils.printReceived(received)} to be sorted by score desc and player asc`), pass: false }
    }
  }
})
