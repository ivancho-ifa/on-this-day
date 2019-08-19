import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import AuthnData from './common/utils/AuthnData'

/** @todo Remove these when not testing individual components anymore */
import Article from './articles/Article'
import Navigation from './common/Navigation'
import Footer from './common/Footer'

import { articles } from './__test__/mock/data.js'

const article = articles[0];

ReactDOM.render(<AuthnData.Provider>
	<Navigation />

	{/* {articles.map((article, index) => */}
		<Article
			// key              ={index}
			title            ={article.title}
			titleImageSrc    ={article.titleImageSrc}
			titleImageCaption={article.titleImageCaption}
			subtitle         ={article.subtitle}
			content          ={article.content}
			rating           ={article.rating}
			reviews          ={article.reviews}
			author           ={article.author}
			date             ={article.date} />
	{/* )} */}

	<Footer />
</AuthnData.Provider>, document.getElementById('root'))
