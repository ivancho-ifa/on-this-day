function AuthnCond(props) {
	return props.isAuthned ?
		props.authned :
		props.unauthned
}

export default AuthnCond
