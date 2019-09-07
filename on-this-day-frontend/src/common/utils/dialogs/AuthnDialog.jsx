import React from 'react'
import { withRouter } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'

import AuthnData from '../authn/AuthnData'


/**
 * Authentication dialog.
 *
 * @param {boolean} props.show - Whether the dialog should be rendered.
 * @param {Function} props.onClose - Callback to execute when closing the dialog.
 *
 * @todo Make this class reusable for all kinds of dialogs.
 */

class AuthnDialog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			signInEmail: "",
			signInPassword: "",
			signUpEmail: "",
			signUpPassword: "",
			signUpPasswordConfirm: "",

			validatedSignIn: false,
			validatedSignUp: false
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSignIn = this.handleSignIn.bind(this)
		this.handleSignUp = this.handleSignUp.bind(this)
	}

	static contextType = AuthnData

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	async handleSignIn(event) {
		event.preventDefault()

		const form = event.currentTarget

		if (!!form.checkValidity()) {
			const authnResponse = await fetch('http://localhost:3003/authn', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					email: this.state.signInEmail,
					password: this.state.signInPassword
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (authnResponse.ok) {
				sessionStorage.setItem('isAuthned', JSON.stringify(true))
				this.context.setAuthnData({isAuthned: true})

				this.props.onClose()
			} else {
				console.error('Authentication failed!')
			}
		}

	}

	async handleSignUp(event) {
		event.preventDefault()

		const authnResponse = await fetch('http://localhost:3003/authn/sign-up', {
			method: 'POST',
			body: JSON.stringify({
				email: this.state.signUpEmail,
				password: this.state.signUpPassword
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (authnResponse.ok) {
			this.props.onClose()
		}
	}

	render() {
		return (
		<Modal
			show={this.props.show}
			onHide={this.props.onClose}>

			<Tab.Container defaultActiveKey="signInEmail">
				<Modal.Header className="pb-0 mb-3 border-bottom-0">
					<Nav fill variant="tabs" className="w-100 flex-row">
						<Nav.Item><Nav.Link eventKey="signInEmail">Sign in</Nav.Link></Nav.Item>
						<Nav.Item><Nav.Link eventKey="signUpEmail">Sign up</Nav.Link></Nav.Item>
					</Nav>
				</Modal.Header>

				<Tab.Content>
					<Tab.Pane eventKey="signInEmail">
						<Modal.Body>
							<Form>
								<Form.Group controlId="email">
									<Form.Label>Email</Form.Label>
									<Form.Control name="signInEmail" value={this.state.signInEmail} onChange={this.handleChange} required form="signInForm" type="email" autoComplete="email" />
								</Form.Group>
								<Form.Group controlId="signInPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control name="signInPassword" value={this.state.signInPassword} onChange={this.handleChange} required form="signInForm" type="password" autoComplete="current-password" />
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Form id="signInForm" validated={this.state.validatedSignIn} onSubmit={this.handleSignIn} >
								<Form.Group
									controlId="signInSubmit"
									className="mb-0">

									<Button
										variant="primary"
										type="submit">

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
									<Form.Control name="signUpEmail" value={this.state.signUpEmail} onChange={this.handleChange} required form="signUpForm" type="email" autoComplete="email" />
								</Form.Group>
								<Form.Group controlId="signUpPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control name="signUpPassword" value={this.state.signUpPassword} onChange={this.handleChange} required form="signUpForm" type="password" autoComplete="new-password" />
								</Form.Group>
								<Form.Group controlId="confirmPassword">
									<Form.Label>Confirm password</Form.Label>
									<Form.Control name="signUpPasswordConfirm" value={this.state.signUpPasswordConfirm} onChange={this.handleChange} required form="signUpForm" type="password" autoComplete="new-password" />
								</Form.Group>
							</Form>
						</Modal.Body>
						<Modal.Footer>
							<Form id="signUpForm" validated={this.state.validatedSignUp} onSubmit={this.handleSignUp} >
								<Form.Group
									controlId="signUpSubmit"
									className="mb-0">

									<Button
										variant="primary"
										type="submit">

										Sign up
									</Button>
								</Form.Group>
							</Form>
						</Modal.Footer>
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</Modal>)
	}
}

export default withRouter(AuthnDialog)
