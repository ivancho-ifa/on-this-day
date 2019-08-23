import React from 'react'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


function NotFound(props) {
	return <Container>
		<Row>
			<Col>
				<h1 className="text-center pt-5 pb-5"><code>{props.location.pathname}</code> not found!</h1>
			</Col>
		</Row>
	</Container>
}

export default NotFound
