import React from 'react'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Figure from 'react-bootstrap/Figure'
import Row from 'react-bootstrap/Row'

import classNames from 'classnames'


async function getUserData(id, callback) {
	const userResponse = await fetch(`http://localhost:3003/users/user-${id}`)

	/** @todo Handle bad response. */
	const user = await userResponse.json()
	callback(user)
}


function SingleColumnLayout(props) {
	return <Container>
		<Row
			className="align-items-center"
			style={{
				flexDirection: "column"
			}}>

			{React.Children.map(props.children, (child) =>
				React.cloneElement(child, {
					className: classNames(child.props.className, "mb-5")
				})
			)}
		</Row>
	</Container>
}


/**
 * Component for an user's page.
 *
 * @returns The page if userData is loaded, else - an empty component.
 */

function User(props) {
	const [userData, setUserData] = React.useState(undefined)

	React.useEffect(() => {
		getUserData(props.id, setUserData)
	}, [props.id])

	return userData ?
	<Container className="pt-5 mt-5">
		<Row className="justify-content-center">
			<Col xl={8}>
				{<SingleColumnLayout>
					<Col className="text-center">
						<Figure>
							<Figure.Image
								alt={userData.name}
								src={userData.profileImage} />
						</Figure>

						<Col>
							<Card as="article">
								<Card.Header as="header">
									<Card.Title as="h1">{userData.name}</Card.Title>
									<Card.Text className="lead">{userData.email}</Card.Text>
								</Card.Header>

								<Card.Body as="article">
									{userData.bio.map((text, index) => <Card.Text key={index}>{text}</Card.Text>)}
								</Card.Body>
							</Card>
						</Col>
					</Col>
				</SingleColumnLayout>}
			</Col>
		</Row>
	</Container> : <React.Fragment />
}

export default User
