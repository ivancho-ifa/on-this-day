import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import AuthnData from './common/utils/authn/AuthnData'
import NotFound from './common/utils/NotFound'

/** @todo Remove these when not testing individual components anymore */
import ArticlePage from './pages/Article'
import ArticlesPage from './pages/Articles'
import Navigation from './common/Navigation'
import Footer from './common/Footer'

import { articles as testArticles } from './__test__/mock/data'


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
			<BrowserRouter>
				<Navigation />

				<Switch>
					<Route exact path={'/articles'} render={(props) => <ArticlesPage articlesIDs={Object.keys(testArticles)} title="All articles" {...props} />}/>
					<Route path={"/articles/article:id"} render={(props) => <ArticlePage id={props.match.params.id} {...props} />} />

					<Route component={NotFound} />
				</Switch>

				<Footer />
			</BrowserRouter>
		</AuthnData.Provider>
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
