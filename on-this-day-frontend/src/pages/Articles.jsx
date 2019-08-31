import React from 'react'

import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


async function getArticleData(id, callback) {
	const articleResponse = await fetch(`http://localhost:3003/articles/article-${id}`)
	/** @todo Handle bad response. */
	const article = await articleResponse.json()

	console.debug(article)

	callback(article)
}


/**
 * Component for an article's card.
 *
 * @returns The card if articleData is loaded, else - an empty component.
 */

function Article(props) {
	const [articleData, setArticleData] = React.useState(undefined)

	React.useEffect(() => {
		getArticleData(props.id, setArticleData)
	}, [props.id])

	return articleData ?
	<Card as="article">
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
	</Card> : <React.Fragment />
}


async function getArticlesIDs(callback) {
	const articlesResponse = await fetch(`http://localhost:3003/articles`)
	/** @todo Handle bad response. */
	const articles = await articlesResponse.json()

	console.debug(articles)

	callback(articles)
}

/**
 * @todo Accept a filter.
 */

function Articles(props) {
	const [articlesIDs, setArticlesIDs] = React.useState(undefined)

	React.useEffect(() => {
		getArticlesIDs(setArticlesIDs)
	}, [])

	return articlesIDs ? <Container className="pt-5">
		<Row>
			<Col>
				<h1 className="mb-5">{props.title}</h1>

				<CardColumns>
					{articlesIDs.map((id) => <Article id={id} key={id} rootPath={`${props.match.url}`} />)}
				</CardColumns>
			</Col>
		</Row>
	</Container> : <React.Fragment />
}

export default Articles
