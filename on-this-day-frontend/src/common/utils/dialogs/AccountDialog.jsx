import React from 'react'
import {useContext} from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import AuthnData from '../authn/AuthnData'


function AccountDialog(props) {
	function handleClose() {props.onClose()}

	const setAuthnData = useContext(AuthnData).setAuthnData

	async function handleLogOut() {
		const logOutResponse = await fetch('http://localhost:3003/authn/sign-out', {
			method: 'POST',
			credentials: 'include'
		})

		if (logOutResponse.ok || logOutResponse.status === 422) {
			sessionStorage.removeItem('isAuthned')
			setAuthnData({ isAuthned: false })

			handleClose()
		}
	}

	return <Modal
		show={props.show}
		onHide={handleClose}>

		<Modal.Header closeButton>
			<Modal.Title>Account</Modal.Title>
		</Modal.Header>

		<Modal.Body className="text-center">
			<Button onClick={handleLogOut} variant="outline-danger">Log out</Button>
		</Modal.Body>

		<Modal.Footer></Modal.Footer>
	</Modal>
}

export default AccountDialog
