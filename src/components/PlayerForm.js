import React, { useState } from 'react'
import { Form, Input, Scope } from '@rocketseat/unform'
import * as Yup from 'yup'
import Player from '../Player'

const PlayerForm = (props) => {
  const [playerData] = useState(props.player || {})

  const schema = Yup.object().shape({
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
  
  const handleSubmit = (data) => {
    const player = new Player(
      props.player ? props.player.id : -1,
      data.name.firstName,
      data.name.lastName,
      Number(data.score)
    )
    props.onSubmit(player)
    props.onCancel()
  }

  return (
    <Form schema={schema}
      initialData={playerData}
      onSubmit={handleSubmit}
      className={props.new ? 'new' : 'edit'}
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
      <button className='cancel' onClick={() => props.onCancel()}>Cancel</button>
      <input type='submit' value={props.new ? 'Add' : 'Save'} />
    </Form>
  )
}
export default PlayerForm
