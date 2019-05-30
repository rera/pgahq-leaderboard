import React, { useState, useContext } from 'react'
import Modal from 'react-modal'
import styles from './AddPlayer.module.scss'

import { DataContext } from '../../data/DataContext'
import PlayerForm from '../PlayerForm/PlayerForm'

const AddPlayer = (props) => {
  const data = useContext(DataContext)

  const [visible, setVisible] = useState(false)
  const closeModal = () => {
    setVisible(false)
  }

  return (
    <div id={styles.AddPlayer}>
      <button onClick={() => setVisible(true)}>
        Add Player
      </button>
      <Modal isOpen={visible} onRequestClose={closeModal}>
        <h2>New Player</h2>
        <PlayerForm submitted={player => data.addPlayer(player)} cancelled={closeModal} />
      </Modal>
    </div>
  )
}

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root')
export default AddPlayer
