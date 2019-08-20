import React from 'react'

import Navbar from 'react-bootstrap/Navbar'


function Footer() {
	return <Navbar
		as="footer"
		className="footer justify-content-center"
		sticky="bottom">
		<Navbar.Text>Follow "On This Day" on <a href="https://www.facebook.com/natoziden681/">Facebook</a></Navbar.Text>
	</Navbar>
}

export default Footer
