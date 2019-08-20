import React from 'react'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


function Article(props) {
	return <Container className="pt-5 mt-5">
		<Row className="justify-content-center">
			<Col xl={8}>
				{props.article}
			</Col>
		</Row>
	</Container>
}

export default Article
