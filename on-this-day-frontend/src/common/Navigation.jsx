import React from 'react'

import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import AccountDialog from './utils/dialogs/AccountDialog'
import AuthnCond from './utils/authn/AuthnCond'
import AuthnDialog from './utils/dialogs/AuthnDialog'
import PopUpDialogManager from './utils/PopUpDialogManager'
import SearchDialog from './utils/dialogs/SearchDialog'


/**
 * Website navigation.
 *
 * @todo Add login, logout, etc.
 * @todo Add ability to create an article.
 */

function Navigation() {
	return (
		<Navbar bg="light">
			<Navbar.Brand href="/">On This Day...</Navbar.Brand>
			<Nav>
				<Nav.Item><Nav.Link href="/articles">Articles</Nav.Link></Nav.Item>
				<AuthnCond
					authned={<Nav.Item><Nav.Link className="p-0 ml-2" href="/articles/createArticle"><Button variant="outline-primary">Create article</Button></Nav.Link></Nav.Item>}
					unauthned={<React.Fragment />} />
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
						activator={<Button variant="outline-secondary">Account</Button>}
						dialog={<AccountDialog />} />}
					unauthned={<PopUpDialogManager
						showDialog={false}
						activator={<Button className="mr-2" variant="outline-secondary">Authenticate</Button>}
						dialog={<AuthnDialog />} />} />
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Navigation
