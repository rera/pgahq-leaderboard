import React from 'react'
import EditPlayer from './EditPlayer'
import DeleteConfirmation from './DeleteConfirmation'

const LeaderboardRow = (props) => {
  return (
    <tr>
      <td className='name'>
        <EditPlayer player={props.player} />
      </td>
      <td className='score'>{props.player.score}</td>
      <td className='delete'>
        <DeleteConfirmation player={props.player} />
      </td>
    </tr>
  )
}
export default LeaderboardRow
