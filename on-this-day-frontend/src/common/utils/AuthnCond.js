import React from 'react'

import AuthnData from './AuthnData'


function AuthnCond(props) {
	return <AuthnData.Consumer>
		{authnData => authnData.isLoggedIn ? props.authned : props.unauthned}
	</AuthnData.Consumer>
}

export default AuthnCond
