import React from 'react'

import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


async function getUserData(id, callback) {
	const userResponse = await fetch(`http://localhost:3003/users/user-${id}`)
	/** @todo Handle bad response. */
	const user = await userResponse.json()

	callback(user)
}


/**
 * Component for an user's card.
 *
 * @returns The card if userData is loaded, else - an empty component.
 */

function User(props) {
	const [userData, setUserData] = React.useState(undefined)

	React.useEffect(() => {
		getUserData(props.id, setUserData)
	}, [props.id])

	return userData ?
	<Card as="article">
		<Card.Img alt={userData.name} src={userData.profileImage} variant="top" />

		<Card.Header as="header" className="border-bottom-0">
			<Card.Title className="lead">{userData.name}</Card.Title>
		</Card.Header>

		<Card.Footer as="footer" className="border-top-0 text-right">
			<Link to={`/users/user${props.id}`}>
				<Button variant="primary">Read more...</Button>
			</Link>
		</Card.Footer>
	</Card> : <React.Fragment />
}


/** @todo Fix naming. Maybe extend function to take projections. */
async function getUsersIDs(filters, callback) {
	let url = new URL('http://localhost:3003/users')
	// Object.keys(filters).forEach(key => url.searchParams.append(key, filters[key]))

	let usersResponse = await fetch(url.toString())
	/** @todo Handle bad response. */
	const users = await usersResponse.json()

	callback(users)
}


/**
 * @todo Accept query not JSON string.
 */

function Users(props) {
	const [usersIDs, setUsersIDs] = React.useState(undefined)

	React.useEffect(() => {
		getUsersIDs(props.filters, setUsersIDs)
	}, [props.filters])

	return usersIDs ? <Container className="pt-5">
		<Row>
			<Col>
				<h1 className="mb-5">{props.title}</h1>

				<CardColumns>
					{usersIDs.map((user) => <User id={user._id} key={user._id} />)}
				</CardColumns>
			</Col>
		</Row>
	</Container> : <React.Fragment />
}

export default Users
