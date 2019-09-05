import React from 'react'


/** @todo Remove this. It proved unneeded. sessionStorage serves the same purpose. */
const AuthnData = React.createContext({
	authnData: {
		isAuthned: false
	},
	setAuthnData: () => {}
})

export default AuthnData
