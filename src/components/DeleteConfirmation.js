import React, { useState, useContext } from 'react'
import Modal from 'react-modal'
import { PlayerContext } from '../data/DataContext'

const DeleteConfirmation = (props) => {
  const [showDeletePlayerModal, setShowDeletePlayerModal] = useState(false)
  if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root')

  const data = useContext(PlayerContext)

  const submit = (e) => {
    e.preventDefault()
    data.deletePlayer(props.player)
    setShowDeletePlayerModal(false)
  }

  return (
    <div className='deletePlayer' data-player={props.player.id}>
      <button onClick={() => setShowDeletePlayerModal(true)}>Delete</button>
      <Modal
        isOpen={showDeletePlayerModal}
        onRequestClose={() => setShowDeletePlayerModal(false)}
        contentLabel='Delete Player'
        ariaHideApp={(process.env.NODE_ENV !== 'test')}
      >
        <form onSubmit={submit} data-player={props.player.id}>
          <h2>Confirm Delete</h2>
          <p>Are you sure you want to delete <strong>{props.player.fullName}</strong>?</p>
          <button className='cancel' onClick={() => setShowDeletePlayerModal(false)}>Cancel</button>
          <input type='submit' value='Yes' />
        </form>
      </Modal>
    </div>
  )
}
export default DeleteConfirmation
