import React, { useState, useContext } from 'react'
import Modal from 'react-modal'

import { DataContext } from '../../../../data/DataContext'
import PlayerForm from '../../../PlayerForm/PlayerForm'

const EditPlayer = (props) => {
  const data = useContext(DataContext)

  const [visible, setVisible] = useState(false)
  const closeModal = () => {
    setVisible(false)
  }

  return (
    <div id='EditPlayer'>
      <button onClick={() => setVisible(true)}>
        {props.children}
      </button>
      <Modal isOpen={visible} onRequestClose={closeModal}>
        <h2>Edit Player</h2>
        <PlayerForm submitted={player => data.editPlayer(player)} cancelled={closeModal} player={props.player} />
      </Modal>
    </div>
  )
}

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root')
export default EditPlayer
