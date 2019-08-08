import React from 'react'

import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Figure from 'react-bootstrap/Figure'
import Jumbotron from 'react-bootstrap/Jumbotron'

import * as Constants from '../common/utils/Constants'

function Signature(props) {
	return <address className="mb-0">
		By <a rel="author" href="#author">{props.author}</a>
		on <time dateTime={props.date}>{new Date(props.date).toLocaleDateString()}</time>
	</address>
}

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

							<Card.Footer
								as="footer"
								className="text-right">

								<Signature
									author={props.author}
									date={props.date}/>
							</Card.Footer>
						</Card>
					</Row>

					<Row className="justify-content-center">
						<Col md={8}>
							<section>
								<header className="mb-5 text-center">
									<h3>User's reviews for this article</h3>
									<p>
										{/** @todo Make this a pop-up. */}
										<a href="#login" className="lead">Log-in to review or share this article</a>
									</p>
								</header>

								{props.reviews.map((review, index) =>
									<Card
										as="article"
										key={index}
										className="mb-3">

										<Card.Header style={{backgroundColor: "inherit", borderBottom: 0}}>
											<Card.Title>{review.title}</Card.Title>
											<Card.Text>Rated: {review.rating}/{Constants.maxArticleRating}</Card.Text>
										</Card.Header>

										<Card.Body>
											<Card.Text>{review.review}</Card.Text>
										</Card.Body>

										<Card.Footer
											as="footer"
											className="text-right"
											style={{backgroundColor: "inherit", borderTop: 0}}>

											<Signature
												author={props.author}
												date={props.date}/>
										</Card.Footer>
									</Card>)}
							</section>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	</Jumbotron>
}

export default Article
