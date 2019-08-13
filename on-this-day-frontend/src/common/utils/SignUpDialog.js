import React from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'


/**
 * Log-in dialog.
 *
 * @param {boolean} props.show - Whether the dialog should be rendered.
 * @param {Function} props.onClose - Callback to execute when closing the dialog.
 *
 * @todo Make this class reusable for all kinds of dialogs.
 */

function SignUpDialog(props) {
	function handleClose() {props.onClose()}

	return <Modal
		show={props.show}
		onHide={handleClose}>

		{/** @todo Make signUp3rdParty the default. */}
		<Tab.Container defaultActiveKey="signUpEmail">
			<Modal.Header className="pb-0 mb-3 border-bottom-0">
				<Nav fill variant="tabs" className="w-100 flex-row">
					<Nav.Item>
						{/** @todo Enable this pane. */}
						<Nav.Link
							disabled
							eventKey="signUp3rdParty">

							Existing 3rd-party account
						</Nav.Link>
					</Nav.Item>

					<Nav.Item>
						<Nav.Link eventKey="signUpEmail">Email</Nav.Link>
					</Nav.Item>

					<Nav.Item>
						<Nav.Link eventKey="signUpUserName">User name</Nav.Link>
					</Nav.Item>
				</Nav>
			</Modal.Header>

			<Tab.Content>
				{/** @todo Enable log-in with Google or Facebook account. */}
				<Tab.Pane eventKey="signUp3rdParty"></Tab.Pane>

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
