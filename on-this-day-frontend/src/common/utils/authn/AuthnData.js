import React from 'react'


const AuthnData = React.createContext({
	authnData: {
		isAuthned: JSON.parse(sessionStorage.getItem('isAuthned'))
	},
	setAuthnData: (authnData) => {}
})

export default AuthnData
