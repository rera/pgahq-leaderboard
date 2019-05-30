import React, { useState } from 'react'
import styles from './PlayerForm.module.scss'

const PlayerForm = (props) => {
	const emptyPlayer = {
		id: -1,
		firstName: '',
		lastName: '',
		score: 0
	}
	const [ player, setPlayer ] = useState(props.player || {...emptyPlayer})

	const [ validated, setValidated ] = useState(false)
	const validateElement = element => {
		const label = element.parentNode.querySelector('.invalidFeedback')
		if (label && element.nodeName.toLowerCase() !== 'button') {
			label.textContent = !element.validity.valid ? element.validationMessage : ''
		}
	}
  const validate = (form) => {
		for (let element of [...form.elements]) {
			validateElement(element)
		}
		return form.checkValidity()
  }

	const handleBlur = event => {
		validateElement(event.target)
	}
	const handleChange = event => {
		let _player = {...player}
		_player[event.target.name] = event.target.value
		setPlayer(_player)
	}
	const handleSubmit = event => {
		event.preventDefault()
    if (validate(event.target)) {
			props.submitted(player)
			props.cancelled()
    }
		setValidated(true)
	}

	return (
		<form onSubmit={handleSubmit} className={validated ? '.isValidated' : ''} noValidate>
			<p>
				<label htmlFor="firstName">First Name:</label>
				<input
					required name="firstName" type="text"
					value={player.firstName} onChange={handleChange} onBlur={handleBlur}
				/>
				<span className='invalidFeedback'></span>
			</p>
			<p>
				<label htmlFor="lastName">Last Name:</label>
				<input
					required name="lastName" type="text"
					value={player.lastName} onChange={handleChange} onBlur={handleBlur}
				/>
				<span className='invalidFeedback'></span>
			</p>
			<p>
				<label htmlFor="score">Score:</label>
				<input
					required name="score" type="number" step="1" min="0" max="100"
					value={player.score} onChange={handleChange} onBlur={handleBlur}
				/>
				<span className='invalidFeedback'></span>
			</p>
			<p>
				<button onClick={props.cancelled} className={styles.cancel}>Cancel</button>
				<button type="submit">Save</button>
			</p>
		</form>
	)
}

export default PlayerForm
