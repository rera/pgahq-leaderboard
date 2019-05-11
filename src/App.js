import React from 'react'
import { PlayerContext } from './data/DataContext'
import Leaderboard from './components/Leaderboard'
import NewPlayer from './components/NewPlayer'
import api from './data/api'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      players: [],
      loading: true,
      data: {
        loadPlayers: () => {
          this.apiCall(
            () => api.allPlayers(),
            (data) => data
          )
        },
        addPlayer: (player) => {
          this.apiCall(
            () => api.createPlayer(player),
            (data) => this.state.players.concat(data)
          )
        },
        editPlayer: (player) => {
          this.apiCall(
            () => api.editPlayer(player),
            (data) => this.state.players.filter(a => a.id !== data.id).concat(data)
          )
        },
        deletePlayer: (player) => {
          this.apiCall(
            () => api.deletePlayer(player.id),
            (data) => this.state.players.filter(a => a.id !== data.id)
          )
        }
      }
    }
  }
  async apiCall (call, formatResponse) {
    this.setState({ loading: true })
    const data = await call()
    this.setState({ players: formatResponse(data), loading: false })
  }
  componentWillMount () {
    this.state.data.loadPlayers()
  }
  render () {
    return (
      <div id='page' className={this.state.loading ? 'loading' : 'loaded'}>
        <PlayerContext.Provider value={this.state.data}>
          <header>
            <NewPlayer />
          </header>
          <Leaderboard players={this.state.players} />
        </PlayerContext.Provider>
      </div>
    )
  }
}

export default App
