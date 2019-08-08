import React from 'react'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Figure from 'react-bootstrap/Figure'
import Jumbotron from 'react-bootstrap/Jumbotron'

import * as Constants from '../common/utils/Constants'

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
					<Row className="mb-5">
						<Card as="article">
							<Card.Header as="header">
								<Card.Title as="h1">{props.title}</Card.Title>
								<Card.Text className="lead">{props.subtitle}</Card.Text>
							</Card.Header>

							<Card.Body as="article">
								{props.content.map((text, index) => <Card.Text key={index}>{text}</Card.Text>)}
							</Card.Body>

							<Card.Footer as="footer" className="text-muted text-right align-middle">
								<address className="mb-0">By <a rel="author" href="#author">{props.author}</a> on <time dateTime={props.date}>{new Date(props.date).toLocaleDateString()}</time></address>
							</Card.Footer>
						</Card>
					</Row>

					<Row className="justify-content-center">
						<Col md={8}>
							<Card as="section">
								<Card.Header as="header">
									<Card.Title>User's reviews for this article</Card.Title>
									{/** @todo Make this a pop-up. */}
									<Card.Link href="#login">Log-in to review or share this article</Card.Link>
								</Card.Header>

								<ListGroup variant="flush">
									{props.reviews.map((review, index) =>
										<ListGroup.Item as="section" key={index}>
											<header className="mb-4">
												<Card.Title>{review.title}</Card.Title>
												<Card.Text className="text-muted">Rated: {review.rating}/{Constants.maxArticleRating}</Card.Text>
											</header>

											<p>
												{review.review}
											</p>

											<footer className="footer text-muted text-right">
												<address className="mb-0">By <a rel="author" href="#author">{review.author}</a> on <time dateTime={review.date}>{new Date(review.date).toLocaleDateString()}</time></address>
											</footer>
										</ListGroup.Item>)}
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	</Jumbotron>
}

export default Article
