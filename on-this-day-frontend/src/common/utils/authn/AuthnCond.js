import React from 'react'

import AuthnData from './AuthnData'


function AuthnCond(props) {
	return <AuthnData.Consumer>
		{context => context.authnData.isAuthned ? props.authned : props.unauthned}
	</AuthnData.Consumer>
}

export default AuthnCond
