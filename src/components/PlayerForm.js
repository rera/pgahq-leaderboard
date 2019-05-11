import React from 'react'
import Player from '../Player'

class PlayerForm extends React.Component {
  constructor (props) {
    super(props)

    if (this.props.player) {
      this.state = {
        firstName: this.props.player.name.firstName,
        lastName: this.props.player.name.lastName,
        score: this.props.player.score
      }
    } else {
      this.state = { firstName: '', lastName: '', score: '' }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  onClose () {
    this.setState(
      { firstName: '', lastName: '', score: '' },
      this.props.onCancel()
    )
  }
  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit (e) {
    e.preventDefault()
    const player = new Player(
      this.props.player ? this.props.player.id : -1,
      this.state.firstName,
      this.state.lastName,
      Number(this.state.score)
    )
    this.props.onSubmit(player)
    this.onClose()
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit} className={this.props.new ? 'new' : 'edit'}>
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
        <input type='submit' value={this.props.new ? 'Add' : 'Save'} />
      </form>
    )
  }
}

export default PlayerForm
