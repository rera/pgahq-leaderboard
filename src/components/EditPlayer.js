import React, { useState, useContext } from 'react'
import Modal from 'react-modal'
import PlayerForm from './PlayerForm'
import { PlayerContext } from '../data/DataContext'

const EditPlayer = (props) => {
  const [showEditPlayerModal, setShowEditPlayerModal] = useState(false)
  if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root')

  const data = useContext(PlayerContext)

  const submit = (player) => {
    data.editPlayer(player)
    setShowEditPlayerModal(false)
  }

  return (
    <div className='editPlayer' data-player={props.player.id}>
      <button onClick={() => setShowEditPlayerModal(true)}>{props.player.fullName}</button>
      <Modal
        isOpen={showEditPlayerModal}
        onRequestClose={() => setShowEditPlayerModal(false)}
        contentLabel='Edit Player'
        ariaHideApp={(process.env.NODE_ENV !== 'test')}
        id='editPlayerModal'
      >
        <h2>Edit Player</h2>
        <PlayerForm onCancel={() => setShowEditPlayerModal(false)} onSubmit={submit} player={props.player} />
      </Modal>
    </div>
  )
}
export default EditPlayer
