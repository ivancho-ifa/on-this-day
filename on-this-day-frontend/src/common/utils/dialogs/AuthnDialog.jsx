import React from 'react'
import {useContext} from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'

import FacebookLogin from 'react-facebook-login'

import AuthnData from '../authn/AuthnData'


/**
 * Authentication dialog.
 *
 * @param {boolean} props.show - Whether the dialog should be rendered.
 * @param {Function} props.onClose - Callback to execute when closing the dialog.
 *
 * @todo Make this class reusable for all kinds of dialogs.
 */

function AuthnDialog(props) {
	function handleClose() { props.onClose() }

	const setAuthnData = useContext(AuthnData).setAuthnData

	async function facebookResponseHandler(fbResponse) {
		const serverResponse = await fetch('http://localhost:3003/authn/facebook', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: {
				accessToken: fbResponse.accessToken
			}
		})

		if (serverResponse.ok) {
			setAuthnData({isAuthned: true})
			console.debug('Successfull authentication!')
		} else {
			console.error('Unsuccessfull authentication attempt!')
		}

		console.debug(serverResponse)
	}

	return <Modal
		show={props.show}
		onHide={handleClose}>

		<Tab.Container defaultActiveKey="authn3rdParty">
			<Modal.Header className="pb-0 mb-3 border-bottom-0">
				<Nav fill variant="tabs" className="w-100 flex-row">
					<Nav.Item><Nav.Link eventKey="authn3rdParty">Existing 3rd-party account</Nav.Link></Nav.Item>
					<Nav.Item><Nav.Link disabled eventKey="signInEmail">Sign in</Nav.Link></Nav.Item>
					<Nav.Item><Nav.Link disabled eventKey="signUpEmail">Sign up</Nav.Link></Nav.Item>
				</Nav>
			</Modal.Header>

			<Tab.Content>
				<Tab.Pane eventKey="authn3rdParty">
					<Modal.Body className="text-center">
						<FacebookLogin
							appId="505839750178336"
							fields="name,email,picture"
							callback={facebookResponseHandler}
							onClick={handleClose}
							icon="fa-facebook"/>
					</Modal.Body>
					<Modal.Footer></Modal.Footer>
				</Tab.Pane>

				<Tab.Pane eventKey="signInEmail">
					<Modal.Body>
						<Form>
							<Form.Group controlId="email">
								<Form.Label>Email</Form.Label>
								<Form.Control type="email" />
							</Form.Group>
							<Form.Group controlId="password">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" />
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Form>
							<Form.Group
								controlId="signInSubmit"
								className="mb-0">

								<Button
									variant="primary"
									onClick={handleClose}>

									Sign in
								</Button>
							</Form.Group>
						</Form>
					</Modal.Footer>
				</Tab.Pane>

				<Tab.Pane eventKey="signUpEmail">
					<Modal.Body>
						<Form>
							<Form.Group controlId="userEmail">
								<Form.Label>User email</Form.Label>
								<Form.Control type="email" />
							</Form.Group>
							<Form.Group controlId="password">
								<Form.Label>Password</Form.Label>
								<Form.Control type="password" />
							</Form.Group>
							<Form.Group controlId="confirmPassword">
								<Form.Label>Confirm password</Form.Label>
								<Form.Control type="confirmPassword" />
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Form>
							<Form.Group
								controlId="signUpSubmit"
								className="mb-0">

								<Button
									variant="primary"
									onClick={handleClose}>

									Sign up
								</Button>
							</Form.Group>
						</Form>
					</Modal.Footer>
				</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	</Modal>
}

export default AuthnDialog
