import React from 'react'
import Modal from 'react-modal'

class NewPlayerForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      score: '',
      show: false
    }

    if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root')

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  toggleModal (modalOpen) {
    this.setState({ show: modalOpen })
  }
  onClose () {
    this.setState(
      { firstName: '', lastName: '', score: '' },
      this.toggleModal(false)
    )
  }
  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.onAddPlayer(this.state.firstName, this.state.lastName, Number(this.state.score))
    this.onClose()
  }
  render () {
    return (
      <div id='newPlayer'>
        <button onClick={() => this.toggleModal(true)}>Add Player</button>
        <Modal
          isOpen={this.state.show}
          onRequestClose={() => this.onClose()}
          contentLabel='Add Player'
          ariaHideApp={(process.env.NODE_ENV !== 'test')}
        >
          <form onSubmit={this.handleSubmit}>
            <h2>Add New Player</h2>
            <p>
              <label htmlFor='firstName'>First Name</label>
              <input type='text' name='firstName' id='firstName' value={this.state.firstName} onChange={this.handleChange} required />
            </p>
            <p>
              <label htmlFor='lastName'>Last Name</label>
              <input type='text' name='lastName' id='lastName' value={this.state.lastName} onChange={this.handleChange} required />
            </p>
            <p>
              <label htmlFor='score'>Score</label>
              <input type='number' min='0' max='100' name='score' id='score' value={this.state.score} onChange={this.handleChange} required />
            </p>
            <button className='cancel' onClick={() => this.onClose()}>Cancel</button>
            <input type='submit' value='Add' />
          </form>
        </Modal>
      </div>
    )
  }
}

export default NewPlayerForm
