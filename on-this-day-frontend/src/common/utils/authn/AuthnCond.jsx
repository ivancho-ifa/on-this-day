import React from 'react'

import AuthnData from './AuthnData'


function AuthnCond(props) {
	console.debug(`sessionStorage.isAuthned = ${sessionStorage.getItem('isAuthned')}`)

	return <AuthnData.Consumer>
		{context => context.authnData.isAuthned || JSON.parse(sessionStorage.getItem('isAuthned')) ? props.authned : props.unauthned}
	</AuthnData.Consumer>
}

export default AuthnCond
