import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

/** @todo Remove these when not testing individual components anymore */
import Article from './articles/Article'
import Navigation from './common/Navigation'
import Footer from './common/Footer'

import { articles } from './__test__/mock/data.js'

ReactDOM.render(<React.Fragment>

	<Navigation />

	{articles.map((article, index) =>
		<Article
			key              ={index}
			title            ={article.title}
			titleImageSrc    ={article.titleImageSrc}
			titleImageCaption={article.titleImageCaption}
			subtitle         ={article.subtitle}
			content          ={article.content}
			rating           ={article.rating}
			reviews          ={article.reviews}
			author           ={article.author}
			date             ={article.date} />
	)}

	<Footer />
</React.Fragment>, document.getElementById('root'))
