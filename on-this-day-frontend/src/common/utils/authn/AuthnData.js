import React from 'react'


const AuthnData = React.createContext({
	authnData: {
		isAuthned: false
	},
	setAuthnData: () => {}
})

export default AuthnData
