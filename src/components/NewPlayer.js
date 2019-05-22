import React, { useState, useContext } from 'react'
import Modal from 'react-modal'
import PlayerForm from './PlayerForm'
import { PlayerContext } from '../data/DataContext'

const NewPlayer = (props) => {
  const [showNewPlayerModal, setShowNewPlayerModal] = useState(false)
  if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root')

  const data = useContext(PlayerContext)

  const toggleModal = (modalOpen) => {
    setShowNewPlayerModal(modalOpen)
  }
  const close = () => {
    toggleModal(false)
  }
  const submit = (player) => {
    data.addPlayer(player)
    close()
  }

  return (
    <div id='newPlayer'>
      <button className='addPlayer' onClick={() => toggleModal(true)}>Add Player</button>
      <Modal
        isOpen={showNewPlayerModal}
        onRequestClose={() => close()}
        contentLabel='Add Player'
        ariaHideApp={(process.env.NODE_ENV !== 'test')}
        id='newPlayerModal'
      >
        <h2>Add New Player</h2>
        <PlayerForm onCancel={close} onSubmit={submit} new />
      </Modal>
    </div>
  )
}
export default NewPlayer
