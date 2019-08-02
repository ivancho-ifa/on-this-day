import React from 'react'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Figure from 'react-bootstrap/Figure'
import Jumbotron from 'react-bootstrap/Jumbotron'

function Article(props) {
	return <Jumbotron fluid className="mb-0">
		<Container>
			<Row className="justify-content-center mb-5">
				<Figure>
					<Figure.Image
						src={props.titleImageSrc}
						alt={props.titleImageCaption} />

					<Figure.Caption className="text-center">
						{props.titleImageCaption}
					</Figure.Caption>
				</Figure>
			</Row>

			<Row className="justify-content-center">
				<Col md={8}>
					<Card as="article">
						<Card.Header as="hgroup">
							<Card.Title as="h1">{props.title}</Card.Title>
							<Card.Subtitle as="h3" className="text-muted">{props.subtitle}</Card.Subtitle>
						</Card.Header>

						<Card.Body as="article">
							{props.content.map(text => <Card.Text>{text}</Card.Text>)}
						</Card.Body>

						<Card.Footer as="footer" className="text-right">
							{/** @todo Make this a pop-up. */}
							<Card.Link href="#login">Log-in to review this article</Card.Link>
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		</Container>
	</Jumbotron>
}

export default Article
