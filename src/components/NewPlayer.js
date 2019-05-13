import React from 'react'
import Modal from 'react-modal'
import PlayerForm from './PlayerForm'
import { PlayerContext } from '../data/DataContext'

class NewPlayer extends React.Component {
  constructor (props) {
    super(props)
    this.state = { show: false }
    if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root')

  }
  toggleModal (modalOpen) {
    this.setState({ show: modalOpen })
  }
  onClose () {
    this.toggleModal(false)
  }
  onSubmit (player) {
    this.context.addPlayer(player)
    this.onClose()
  }
  render () {
    return (
      <div id='newPlayer'>
        <button className='addPlayer' onClick={() => this.toggleModal(true)}>Add Player</button>
        <Modal
          isOpen={this.state.show}
          onRequestClose={() => this.onClose()}
          contentLabel='Add Player'
          ariaHideApp={(process.env.NODE_ENV !== 'test')}
          id='newPlayerModal'
        >
          <h2>Add New Player</h2>
          <PlayerForm
            onCancel={this.onClose.bind(this)}
            onSubmit={this.onSubmit.bind(this)}
            new
          />
        </Modal>
      </div>
    )
  }
}
NewPlayer.contextType = PlayerContext
export default NewPlayer
