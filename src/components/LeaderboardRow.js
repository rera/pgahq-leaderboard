import React from 'react'
import DeleteConfirmation from './DeleteConfirmation.js'

class LeaderboardRow extends React.Component {
  constructor (props) {
    super(props)
    this.deleteConfirmation = React.createRef()
  }
  onDeletePlayer (player) {
    this.props.onDeletePlayer(player)
  }
  render () {
    return (
      <tr>
        <td className='name'>{this.props.player.name}</td>
        <td className='score'>{this.props.player.score}</td>
        <td className='delete'>
          <button onClick={() => this.deleteConfirmation.current.toggleModal(true)}>Delete</button>
          <DeleteConfirmation ref={this.deleteConfirmation} onDeletePlayer={this.onDeletePlayer.bind(this)} player={this.props.player} />
        </td>
      </tr>
    )
  }
}

export default LeaderboardRow
