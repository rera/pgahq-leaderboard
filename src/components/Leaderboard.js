import React from 'react'
import {Waypoint} from 'react-waypoint'
import LeaderboardRow from './LeaderboardRow.js'

const Leaderboard = (props) => {
  const sortPlayers = (a, b) => {
    return (a.score === b.score) ? (b.name > a.name ? -1 : 1) : b.score - a.score
  }
  const handleWaypointEnter = () => {
    document.getElementById('page').classList.remove('sticky')
  }
  const handleWaypointLeave = () => {
    document.getElementById('page').classList.add('sticky')
  }

  return (
    <div>
      <Waypoint
        onEnter={handleWaypointEnter}
        onLeave={handleWaypointLeave}
      />
      <table id='leaderboard'>
        <thead>
          <tr>
            <th className='name'>Name</th>
            <th className='score'>Score</th>
            <th className='delete' />
          </tr>
        </thead>
        <tbody>
          {props.players.sort(sortPlayers).map((player, key) =>
            <LeaderboardRow player={player} key={key} />
          )}
        </tbody>
      </table>
    </div>
  )
}
export default Leaderboard
