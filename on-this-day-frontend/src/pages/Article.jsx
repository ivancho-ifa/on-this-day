import React from 'react'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import ArticleComponent from '../components/Article'

/** @todo Remove these when not testing anymore */
import { getArticleAtID } from '../__test__/mock/data.js'


function Article(props) {
	const articleData = getArticleAtID(props.id)

	return <Container className="pt-5 mt-5">
		<Row className="justify-content-center">
			<Col xl={8}>
				{<ArticleComponent
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
	</Container>
}

export default Article
