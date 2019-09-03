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
			<Link to={`/articles/article${props.id}`}>
				<Button variant="primary">Read more...</Button>
			</Link>
		</Card.Footer>
	</Card> : <React.Fragment />
}


/** @todo Fix naming. Maybe extend function to take projections. */
async function getArticlesIDs(filters, callback) {
	let url = new URL('http://localhost:3003/articles')
	Object.keys(filters).forEach(key => url.searchParams.append(key, filters[key]))

	let articlesResponse = await fetch(url.toString())
	/** @todo Handle bad response. */
	const articles = await articlesResponse.json()

	callback(articles)
}


/**
 * @todo Accept query not JSON string.
 */

function Articles(props) {
	const [articlesIDs, setArticlesIDs] = React.useState(undefined)

	React.useEffect(() => {
		getArticlesIDs(props.filters, setArticlesIDs)
	}, [props.filters])

	return articlesIDs ? <Container className="pt-5">
		<Row>
			<Col>
				<h1 className="mb-5">{props.title}</h1>

				<CardColumns>
					{articlesIDs.map((article) => <Article id={article._id} key={article._id} />)}
				</CardColumns>
			</Col>
		</Row>
	</Container> : <React.Fragment />
}

export default Articles
