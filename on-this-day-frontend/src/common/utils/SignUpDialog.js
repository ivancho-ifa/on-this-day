import React from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'

import FacebookLogin from 'react-facebook-login'


/**
 * Sign-up dialog.
 *
 * @param {boolean} props.show - Whether the dialog should be rendered.
 * @param {Function} props.onClose - Callback to execute when closing the dialog.
 *
 * @todo Make this class reusable for all kinds of dialogs.
 */

function SignUpDialog(props) {
	function handleClose() { props.onClose() }

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

		console.debug(serverResponse)

		// .then(response => {
		// 	console.debug(response)

		// 	const token = response.headers.get('x-auth-token')

		// 	console.debug(`Posting to https://localhost:3003/auth/facebook`)
		// 	response.json().then(user => {
		// 		if (token) {
		// 			console.log(`Successfully authenticated user ${user} with token ${token}`)
		// 		}
		// 	})
		// }).catch(error => {
		// 	console.log(`Authentication failed with error ${error}`)
		// })
	}

	return <Modal
		show={props.show}
		onHide={handleClose}>

		<Tab.Container defaultActiveKey="signUp3rdParty">
			<Modal.Header className="pb-0 mb-3 border-bottom-0">
				<Nav fill variant="tabs" className="w-100 flex-row">
					<Nav.Item>
						<Nav.Link eventKey="signUp3rdParty">Existing 3rd-party account</Nav.Link>
					</Nav.Item>

					{/** @todo Enable signUpEmail and signUpUserName. */}
					<Nav.Item>
						<Nav.Link
							disabled
							eventKey="signUpEmail">

							Email
						</Nav.Link>
					</Nav.Item>

					<Nav.Item>
						<Nav.Link
							disabled
							eventKey="signUpUserName">

							User name
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</Modal.Header>

			<Tab.Content>
				<Tab.Pane eventKey="signUp3rdParty">
					<Modal.Body className="text-center">
						<FacebookLogin
							appId="505839750178336"
							fields="name,email,picture"
							callback={facebookResponseHandler}
							icon="fa-facebook"/>
					</Modal.Body>
					<Modal.Footer></Modal.Footer>
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

				<Tab.Pane eventKey="signUpUserName">
					<Modal.Body>
						<Form>
							<Form.Group controlId="userName">
								<Form.Label>User name</Form.Label>
								<Form.Control type="text" />
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

export default SignUpDialog
