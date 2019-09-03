import React from 'react'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Figure from 'react-bootstrap/Figure'
import Row from 'react-bootstrap/Row'

import classNames from 'classnames'

import * as Constants from '../common/utils/Constants'
import AddReviewDialog from '../common/utils/dialogs/AddReviewDialog'
import AuthnCond from '../common/utils/authn/AuthnCond'
import AuthnDialog from '../common/utils/dialogs/AuthnDialog'
import PopUpDialogManager from '../common/utils/PopUpDialogManager'
import Button from 'react-bootstrap/Button'


/**
 * @fileOverview Implements component that renders article's info.
 *
 * @todo Add documentation.
 * @todo Refresh on new comment.
 */


/**
 * Component for displaying article contents.
 */

function SingleColumnLayout(props) {
	return <Container>
		<Row
			className="align-items-center"
			style={{
				flexDirection: "column"
			}}>

			{React.Children.map(props.children, (child) =>
				React.cloneElement(child, {
					className: classNames(child.props.className, "mb-5")
				})
			)}
		</Row>
	</Container>
}


function Signature(props) {
	return <address className="mb-0">
		{/**
		  * @todo Split to two lines without trashing whitespace.
		  * @todo Current format is m/d/YYYY. Fix it.
		  */}

		By <a rel="author" href="#author">{props.author}</a> on <time dateTime={props.date}>{new Date(props.date.year, props.date.month - 1, props.date.date).toLocaleDateString()}</time>
	</address>
}


/**
 * Renders the information for an article.
 *
 * @todo Reviews list and article's content could be de-duplicated.
 */

function Article(props) {
	return <SingleColumnLayout>
		<Col className="text-center">
			<Figure>
				<Figure.Image
					alt={props.titleImageCaption}
					src={props.titleImageSrc} />

				<Figure.Caption>{props.titleImageCaption}</Figure.Caption>
			</Figure>
		</Col>

		<Col>
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
		</Col>

		<Col xl={8}>
			<aside>
				<header className="text-center mb-5">
					<h3>User's reviews for this article</h3>
					<AuthnCond
						authned={<PopUpDialogManager
							showDialog={false}
							activator={<Button
								className="mt-3"
								variant="secondary">
								Add your review
							</Button>}
							dialog={<AddReviewDialog articleID={props.articleID} />} />}

						unauthned={<PopUpDialogManager
							showDialog={false}
							activator={<Button variant="secondary">Log-in to review or share this article</Button>}
							dialog={<AuthnDialog />} />} />
				</header>

				{props.reviews.map((review, index) => <Card
					as="article"
					className="mb-3"
					key={index}>

					<Card.Header
						style={{
							backgroundColor: "inherit",
							borderBottom: 0
						}}>

						<Card.Title>{review.title}</Card.Title>
						<Card.Text>Rated: {review.rating}/{Constants.maxArticleRating}</Card.Text>
					</Card.Header>

					<Card.Body>
						<Card.Text>{review.review}</Card.Text>
					</Card.Body>

					<Card.Footer
							as="footer"
							className="text-right"
							style={{
								backgroundColor: "inherit",
								borderTop: 0
							}}>

						<Signature
							author={props.author}
							date={props.date}/>
					</Card.Footer>
				</Card>)}
			</aside>
		</Col>
	</SingleColumnLayout>
}

export default Article
