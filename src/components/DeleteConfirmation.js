import React from 'react'
import Modal from 'react-modal'
import { PlayerContext } from '../data/DataContext'

class DeleteConfirmation extends React.Component {
  constructor (props) {
    super(props)
    this.state = { show: false }
    if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root')
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  toggleModal (modalOpen) {
    this.setState({ show: modalOpen })
  }
  handleSubmit (e) {
    e.preventDefault()
    this.context.deletePlayer(this.props.player)
    this.toggleModal(false)
  }
  render () {
    return (
      <Modal
        isOpen={this.state.show}
        onRequestClose={() => this.toggleModal(false)}
        contentLabel='Delete Player'
        ariaHideApp={(process.env.NODE_ENV !== 'test')}
      >
        <form onSubmit={this.handleSubmit} data-player={this.props.player.id}>
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete <strong>{this.props.player.fullName}</strong>?</p>
          <button className='cancel' onClick={() => this.toggleModal(false)}>Cancel</button>
          <input type='submit' value='Yes' />
        </form>
      </Modal>
    )
  }
}
DeleteConfirmation.contextType = PlayerContext
export default DeleteConfirmation
