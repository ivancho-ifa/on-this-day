import React from 'react'

import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import AccountDialog from './utils/AccountDialog'
import AuthnCond from './utils/AuthnCond'
import PopUpDialogManager from './utils/PopUpDialogManager'
import SearchDialog from './utils/SearchDialog'
import SignUpDialog from './utils/SignUpDialog'
import LogInDialog from './utils/LogInDialog'


/**
 * Website navigation.
 *
 * @todo Add login, logout, etc.
 * @todo Add ability to create an article.
 */

function Navigation() {
	return (
		<Navbar bg="light">
			<Navbar.Brand href="#on-this-day">On This Day...</Navbar.Brand>
			<Nav>
				<Nav.Item><Nav.Link href="#satelite">Satelite</Nav.Link></Nav.Item>
				<Nav.Item><Nav.Link href="#about">About us</Nav.Link></Nav.Item>
			</Nav>

  			<Navbar.Collapse className="justify-content-end">
				<PopUpDialogManager
					showDialog={false}
					activator={<Button
						className="mr-2"
						variant="outline-primary">

						Search
					</Button>}
					dialog={<SearchDialog />} />

				<AuthnCond
					authned={<PopUpDialogManager
						showDialog={false}
						activator={<Button variant="outline-secondary">
							Account
						</Button>}
						dialog={<AccountDialog />} />}
					unauthned={<React.Fragment>
						<PopUpDialogManager
							showDialog={false}
							activator={<Button
								className="mr-2"
								variant="outline-secondary">

								Sign up
							</Button>}
							dialog={<SignUpDialog />} />

						<PopUpDialogManager
							showDialog={false}
							activator={<Button variant="outline-secondary">
								Log in
							</Button>}
							dialog={<LogInDialog />} />
					</React.Fragment>} />
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Navigation
