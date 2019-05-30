import React from 'react'
import styles from './Leaderboard.module.scss'
import { Waypoint } from 'react-waypoint'
import Row from './Row/Row'

const Leaderboard = (props) => {
	const sortLeaderboard = (a, b) => {
		if (a.score === b.score) {
			return a.lastName > b.lastName ? 1 : -1
		} else {
			return a.score < b.score ? 1 : -1
		}
	}
  const handleWaypointEnter = () => {
    document.getElementById('app').classList.remove('sticky')
  }
  const handleWaypointLeave = () => {
    document.getElementById('app').classList.add('sticky')
  }

	return (
		<div>
			<Waypoint onEnter={handleWaypointEnter} onLeave={handleWaypointLeave} />
			<table>
				<thead>
					<tr>
						<th className={styles.name}>Name</th>
						<th className={styles.score}>Score</th>
						<th className={styles.delete}></th>
					</tr>
				</thead>
				<tbody>
					{props.players.sort(sortLeaderboard).map( (player, index) =>
						<Row key={index} player={player} />
					)}
				</tbody>
			</table>
		</div>
	)
}

export default Leaderboard
