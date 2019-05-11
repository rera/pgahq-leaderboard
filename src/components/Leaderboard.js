import React from 'react'
import LeaderboardRow from './LeaderboardRow.js'

class Leaderboard extends React.Component {
  sortPlayers (a, b) {
    return (a.score === b.score) ? (b.name > a.name ? -1 : 1) : b.score - a.score
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
            <LeaderboardRow player={player} key={key} />
          )}
        </tbody>
      </table>
    )
  }
}

export default Leaderboard
