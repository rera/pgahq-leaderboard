import React from 'react'
import Modal from 'react-modal'
import PlayerForm from './PlayerForm'
import { PlayerContext } from '../data/DataContext'

class EditPlayer extends React.Component {
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
    this.context.editPlayer(player)
    this.onClose()
  }
  render () {
    return (
      <div className='editPlayer' data-player={this.props.player.id}>
        <Modal
          isOpen={this.state.show}
          onRequestClose={() => this.onClose()}
          contentLabel='Edit Player'
          ariaHideApp={(process.env.NODE_ENV !== 'test')}
          id='editPlayerModal'
        >
          <h2>Edit Player</h2>
          <PlayerForm
            onCancel={this.onClose.bind(this)}
            onSubmit={this.onSubmit.bind(this)}
            player={this.props.player}
          />
        </Modal>
      </div>
    )
  }
}
EditPlayer.contextType = PlayerContext
export default EditPlayer
