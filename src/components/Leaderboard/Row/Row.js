import React, { useContext } from 'react'
import styles from './Row.module.scss'

import { DataContext } from '../../../data/DataContext'
import EditPlayer from './EditPlayer/EditPlayer'

const Row = (props) => {
	const data = useContext(DataContext)

	return (
		<tr>
			<td className={styles.name}>
				<EditPlayer player={props.player} >
					{props.player.lastName}, {props.player.firstName}
				</EditPlayer>
			</td>
			<td className={styles.score}>{props.player.score}</td>
			<td className={styles.delete}>
				<button onClick={() => data.deletePlayer(props.player.id)}>Delete</button>
			</td>
		</tr>
	)
}

export default Row
