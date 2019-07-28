import React from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function Navigation() {
	return (
		<Navbar bg="light">
			<Navbar.Brand href="#on-this-day">On This Day...</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Item><Nav.Link href="#satelite">Satelite</Nav.Link></Nav.Item>
				<Nav.Item><Nav.Link href="#about">About us</Nav.Link></Nav.Item>
			</Nav>
			<Form inline>
				<Button variant="outline-primary">Search</Button>
			</Form>
		</Navbar>
	)
}

export default Navigation
