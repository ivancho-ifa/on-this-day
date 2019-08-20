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


/**
 * Note that this component is needed because authnData must be in the state of
 * some object, else all child components will re-render on change of
 * AuthnData.Provider's context.
 */

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			authnData: {
				isAuthned: false
			},
			setAuthnData: (authnData) => {
				this.setState({authnData})
			}
		}
	}

	render() {
		return <AuthnData.Provider value={this.state}>

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
		</AuthnData.Provider>
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
