import React from 'react'
import EditPlayer from './EditPlayer'
import DeleteConfirmation from './DeleteConfirmation'

class LeaderboardRow extends React.Component {
  constructor (props) {
    super(props)
    this.editPlayerRef = React.createRef()
    this.deleteConfirmationRef = React.createRef()
  }
  render () {
    return (
      <tr>
        <td className='name'>
          <button onClick={() => this.editPlayerRef.current.toggleModal(true)}>{this.props.player.fullName}</button>
          <EditPlayer ref={this.editPlayerRef} player={this.props.player}
          />
        </td>
        <td className='score'>{this.props.player.score}</td>
        <td className='delete'>
          <button onClick={() => this.deleteConfirmationRef.current.toggleModal(true)}>Delete</button>
          <DeleteConfirmation ref={this.deleteConfirmationRef} player={this.props.player} />
        </td>
      </tr>
    )
  }
}

export default LeaderboardRow
