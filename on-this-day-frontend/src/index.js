import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

/** @todo Remove these when not testing individual components anymore */
import Article from './articles/Article'
import Navigation from './common/Navigation'

ReactDOM.render(<div>
	<Navigation />
	<Article />
</div>, document.getElementById('root'))
