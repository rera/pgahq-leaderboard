import React from 'react'
import api from './data/api'
import Leaderboard from './components/Leaderboard'
import NewPlayerForm from './components/NewPlayerForm'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      loading: true
    }
  }
  async apiCall (call, formatResponse) {
    this.setState({ loading: true })
    const data = await call()
    this.setState({
      data: formatResponse(data),
      loading: false
    })
  }
  componentWillMount () {
    this.apiCall(
      () => api.allPlayers(),
      (data) => data
    )
  }
  onAddPlayer (firstName, lastName, score) {
    this.apiCall(
      () => api.createPlayer({ firstName: firstName, lastName: lastName, score: score }),
      (data) => this.state.data.concat(data)
    )
  }
  onDeletePlayer (player) {
    this.apiCall(
      () => api.deletePlayer(player.id),
      (data) => this.state.data.filter(a => a.id !== data.id)
    )
  }
  render () {
    return (
      <div id='page' className={this.state.loading ? 'loading' : 'loaded'}>
        <header>
          <NewPlayerForm onAddPlayer={this.onAddPlayer.bind(this)} />
        </header>
        <Leaderboard players={this.state.data} onDeletePlayer={this.onDeletePlayer.bind(this)} />
      </div>
    )
  }
}

export default App
