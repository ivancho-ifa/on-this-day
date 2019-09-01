import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import AuthnData from './common/utils/authn/AuthnData'
import NotFound from './common/utils/NotFound'

import ArticlePage from './pages/Article'
import ArticlesPage from './pages/Articles'
import CreateArticlePage from './pages/CreateArticle'

import Navigation from './common/Navigation'
import Footer from './common/Footer'


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
					<Route exact path={'/'} render={(props) => <Redirect to='/articles' />} />

					<Route exact path={'/articles'} render={(props) => <ArticlesPage filters={{}} title="All articles" {...props} />} />
					{/** @todo Accept query not JSON string. */}
					<Route path={'/articles/filter/:filters'} render={(props) => <ArticlesPage filters={JSON.parse(props.match.params.filters)} title={`Filtered by ${props.match.params.filters}`} {...props} />} />

					{/** @todo Rename to /articles/article-:id */}
					<Route path={"/articles/article:id"} render={(props) => <ArticlePage id={props.match.params.id} {...props} />} />
					<Route path={"/articles/createArticle"} component={CreateArticlePage} />

					<Route component={NotFound} />
				</Switch>

				<Footer />
			</BrowserRouter>
		</AuthnData.Provider>
	}
}

ReactDOM.render(<App />, document.getElementById('root'))
