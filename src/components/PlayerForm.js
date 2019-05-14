import React from 'react'
import { Form, Input, Scope } from '@rocketseat/unform'
import * as Yup from 'yup'
import Player from '../Player'

class PlayerForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: this.props.player || {},
      schema: Yup.object().shape({
        name: Yup.object().shape({
          firstName: Yup.string().required('First name is required.'),
          lastName: Yup.string().required('Last name is required.')
        }),
        score: Yup.number()
          .typeError('Score must be a number.')
          .min(0, 'Score must be between 0 and 100.')
          .max(100, 'Score must be between 0 and 100.')
          .integer('Score must be a whole number.')
          .required('Score is required.')
      })
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  onClose () {
    this.props.onCancel()
  }
  handleSubmit (data) {
    const player = new Player(
      this.props.player ? this.props.player.id : -1,
      data.name.firstName,
      data.name.lastName,
      Number(data.score)
    )
    this.props.onSubmit(player)
    this.onClose()
  }
  render () {
    return (
      <Form schema={this.state.schema}
        initialData={this.state.data}
        onSubmit={this.handleSubmit}
        className={this.props.new ? 'new' : 'edit'}
      >
        <Scope path="name">
          <p>
            <label htmlFor='firstName'>First Name</label>
            <Input name="firstName" />
          </p>
          <p>
            <label htmlFor='lastName'>Last Name</label>
            <Input name="lastName" />
          </p>
        </Scope>
        <p>
          <label htmlFor='score'>Score</label>
          <Input name="score" />
        </p>
        <button className='cancel' onClick={() => this.onClose()}>Cancel</button>
        <input type='submit' value={this.props.new ? 'Add' : 'Save'} />
      </Form>
    )
  }
}

export default PlayerForm
