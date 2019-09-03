import React from 'react'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import ArticleComponent from '../components/Article'


async function getArticleData(id, callback) {
	const articleResponse = await fetch(`http://localhost:3003/articles/article-${id}`)
	/** @todo Handle bad response. */
	const article = await articleResponse.json()

	callback(article)
}


/**
 * Component for an article's page.
 *
 * @returns The page if articleData is loaded, else - an empty component.
 */

function Article(props) {
	const [articleData, setArticleData] = React.useState(undefined)

	React.useEffect(() => {
		getArticleData(props.id, setArticleData)
	}, [props.id])

	return articleData ?
	<Container className="pt-5 mt-5">
		<Row className="justify-content-center">
			<Col xl={8}>
				{<ArticleComponent
					articleID        ={props.id}
					title            ={articleData.title}
					titleImageSrc    ={articleData.titleImageSrc}
					titleImageCaption={articleData.titleImageCaption}
					subtitle         ={articleData.subtitle}
					content          ={articleData.content}
					rating           ={articleData.rating}
					reviews          ={articleData.reviews}
					author           ={articleData.author}
					date             ={articleData.date} />}
			</Col>
		</Row>
	</Container> : <React.Fragment />
}

export default Article
