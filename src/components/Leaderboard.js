import React from 'react'
import LeaderboardRow from './LeaderboardRow.js'

class Leaderboard extends React.Component {
  sortPlayers (a, b) {
    if (a.score === b.score) {
      return ([b.name, a.name].sort())[0] === b.name ? 1 : -1
    }
    return a.score < b.score ? 1 : -1
  }
  onDeletePlayer (player) {
    this.props.onDeletePlayer(player)
  }
  render () {
    return (
      <table id='leaderboard'>
        <thead>
          <tr>
            <th className='name'>Name</th>
            <th className='score'>Score</th>
            <th className='delete' />
          </tr>
        </thead>
        <tbody>
          {this.props.players.sort(this.sortPlayers).map((player, key) =>
            <LeaderboardRow player={player} key={key} onDeletePlayer={this.onDeletePlayer.bind(this)} />
          )}
        </tbody>
      </table>
    )
  }
}

export default Leaderboard
