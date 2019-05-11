import React from 'react'
import { mount } from 'enzyme'

import api from '../data/api'
import playersMock from '../data/db.json'
import Player from '../Player'

import App from '../App'
import Leaderboard from '../components/Leaderboard'
import LeaderboardRow from '../components/LeaderboardRow'
import NewPlayer from '../components/NewPlayer'
import EditPlayer from '../components/EditPlayer'

describe('App', () => {
  let wrap = {}
  beforeEach(async () => {
    jest.spyOn(api, 'allPlayers').mockImplementation(() => {
      return playersMock.map(p => new Player(p.id, p.firstName, p.lastName, p.score))
    })
    jest.spyOn(api, 'createPlayer').mockImplementation((p) => {
      p.id = Math.floor(Math.random() * 9999) + 8999
      return p
    })
    jest.spyOn(api, 'editPlayer').mockImplementation((p) => { return p })
    jest.spyOn(api, 'deletePlayer').mockImplementation((id) => { return { id: id } })

    wrap = await mount(<App />)
    wrap.update()
  })
  afterEach(() => {
    api.allPlayers.mockClear()
    api.createPlayer.mockClear()
    api.editPlayer.mockClear()
    api.deletePlayer.mockClear()
    wrap.unmount()
  })

  it('renders without crashing', () => {
    wrap.find(Leaderboard)
    expect(wrap.length).toEqual(1)
  })

  it('has data', () => {
    const players = wrap.state('players')
    expect(players.length).toBeGreaterThan(0)
  })

  describe('Leaderboard', () => {
    it('has correct row count', () => {
      const players = wrap.state('players')
      const leaderboard = wrap.find(Leaderboard).first()
      expect(leaderboard.find(LeaderboardRow).length).toEqual(players.length)
    })

    it('is sorted correctly', () => {
      const players = wrap.find(LeaderboardRow).map(node => node.props().player)
      expect(players).toBeSortedByScoreAndLastName()
    })
  })

  describe('LeaderboardRow', () => {
    it('renders name in correct format', () => {
      const row = wrap.find(LeaderboardRow).first()
      const player = row.props().player
      expect(wrap.find('td').first().text()).toEqual(player.name.lastName + ', ' + player.name.firstName)
    })

    it('can delete player', async () => {
      const players = wrap.state('players')
      const playersCount = players.length
      const leaderboard = wrap.find(Leaderboard).first()

      const rows = leaderboard.find(LeaderboardRow)
      const randomRow = rows.at(Math.floor(rows.length * Math.random()))
      const deletingName = randomRow.props().player.fullName

      randomRow.find('td.delete button').simulate('click')
      await wrap.find('form').simulate('submit')
      wrap.update()

      const updatedPlayersCount = wrap.state('players').length
      const updatedLeaderboard = wrap.find(Leaderboard).first()
      const updatedPlayers = updatedLeaderboard.find(LeaderboardRow).map(node => node.props().player)

      // state shows correct count
      expect(updatedPlayersCount).toEqual(playersCount - 1)
      // leaderboard shows correct count
      expect(updatedLeaderboard.find(LeaderboardRow).length).toEqual(updatedPlayersCount)
      // correct player is removed
      expect(updatedLeaderboard.text()).not.toContain(deletingName)
      // leaderboard remains correctly sorted
      expect(updatedPlayers).toBeSortedByScoreAndLastName()
    })
  })

  describe('NewPlayer', () => {
    it('can add player', async () => {
      const players = wrap.state('players')
      const playersCount = players.length
      const newPlayer = new Player(-1, 'John', 'Doe', 99)

      await wrap.find(NewPlayer).instance().onSubmit(newPlayer)
      wrap.update()

      const updatedPlayersCount = wrap.state('players').length
      const updatedLeaderboard = wrap.find(Leaderboard).first()
      const updatedPlayers = updatedLeaderboard.find(LeaderboardRow).map(node => node.props().player)

      // state shows correct count
      expect(updatedPlayersCount).toEqual(playersCount + 1)
      // leaderboard shows correct count
      expect(updatedLeaderboard.find(LeaderboardRow).length).toEqual(updatedPlayersCount)
      // correct player is added
      expect(updatedLeaderboard.text()).toContain(newPlayer.name.lastName + ', ' + newPlayer.name.firstName)
      // leaderboard remains correctly sorted
      expect(updatedPlayers).toBeSortedByScoreAndLastName()
    })
  })

  describe('EditPlayer', () => {
    it('can edit player', async () => {
      const rows = wrap.find(Leaderboard).find(LeaderboardRow)
      const randomRow = rows.at(Math.floor(rows.length * Math.random()))
      const randomScore = Math.floor(100 * Math.random())

      const editingPlayer = randomRow.props().player
      editingPlayer.score = randomScore

      await randomRow.find(EditPlayer).instance().onSubmit(editingPlayer)
      wrap.update()

      const updatedPlayers = wrap.find(Leaderboard).find(LeaderboardRow).map(node => node.props().player)

      // correct player is edited
      expect(updatedPlayers.find(p => p.id === editingPlayer.id).score).toEqual(editingPlayer.score)
      // leaderboard remains correctly sorted
      expect(updatedPlayers).toBeSortedByScoreAndLastName()
    })
  })
})

expect.extend({
  toBeSortedByScoreAndLastName (received) {
    const pass = this.equals(received,
      received.concat().sort((a, b) => {
        return (a.score === b.score) ? (b.name > a.name ? -1 : 1) : b.score - a.score
      })
    )
    if (pass) {
      return {
        message: () => (`expected ${this.utils.printReceived(received)} to be sorted by score desc and player asc`),
        pass: true
      }
    } else {
      return {
        message: () => (`expected ${this.utils.printReceived(received)} to be sorted by score desc and player asc`),
        pass: false
      }
    }
  }
})
