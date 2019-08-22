import React from 'react'

import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

/** @todo Remove these when not testing anymore */
import { getArticleAtID } from '../__test__/mock/data.js'


function Article(props) {
	const articleData = getArticleAtID(props.id)

	return <Card as="article">
		<Card.Img alt={articleData.titleImageCaption} src={articleData.titleImageSrc} variant="top" />

		<Card.Header as="header" className="border-bottom-0">
			<Card.Title className="lead">{articleData.title}</Card.Title>
			<Card.Text>{articleData.subtitle}</Card.Text>
		</Card.Header>

		<Card.Footer as="footer" className="border-top-0 text-right">
			<Link to={`${props.rootPath}/article${props.id}`}>
				<Button variant="primary">Read more...</Button>
			</Link>
		</Card.Footer>
	</Card>
}

function Articles(props) {
	console.debug(props.match.url)

	return <Container className="pt-5">
		<Row>
			<Col>
				<h1 className="mb-5">{props.title}</h1>

				<CardColumns>
					{props.articlesIDs.map((id) => <Article id={id} key={id} rootPath={`${props.match.url}`} />)}
				</CardColumns>
			</Col>
		</Row>
	</Container>
}

export default Articles
