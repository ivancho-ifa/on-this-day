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

	<Article
		title={articles[0].title}
		titleImageSrc={articles[0].titleImageSrc}
		titleImageCaption={articles[0].titleImageCaption}
		subtitle={articles[0].subtitle}
		content={articles[0].content}
		rating={articles[0].rating}
		comments={articles[0].comments}
		author={articles[0].author}
		date={articles[0].date} />

	<Footer />
</React.Fragment>, document.getElementById('root'))
