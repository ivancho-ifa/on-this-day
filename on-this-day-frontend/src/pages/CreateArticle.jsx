import React from 'react'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import AuthnCond from '../common/utils/authn/AuthnCond'
import AuthnDialog from '../common/utils/dialogs/AuthnDialog'
import PopUpDialogManager from '../common/utils/PopUpDialogManager'


/**
 * @todo Make "textarea"s auto resizable.
 */

class CreateArticle extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			title: {
				value: "",
				rows: 1
			},
			titleImageSrc: "",
			titleImageCaption: {
				value: "",
				rows: 1
			},

			subtitle: {
				value: "",
				rows: 1
			},
			content: {
				value: "",
				rows: 10
			},

			validated: false
		}

		this.abortController = new AbortController()

		this.handleTextareaChange = this.handleTextareaChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillUnmount() {
		this.abortController.abort()
	}

	handleTextareaChange(event) {
		const hasValue = event.target.name !== "titleImageSrc"

		this.setState({
			[event.target.name]: hasValue ? {
				value: event.target.value
			} : event.target.value
		})
	}

	async handleSubmit(event) {
		event.preventDefault()

		const form = event.currentTarget

		console.debug(form)

		if (form.checkValidity()) {
			const response = await fetch(`http://localhost:3003/articles/add-article`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({
					title: this.state.title.value,
					titleImageSrc: this.state.titleImageSrc,
					titleImageCaption: this.state.titleImageCaption.value,
					subtitle: this.state.subtitle.value,
					content: this.state.content.value
				}),
				signal: this.abortController.signal
			})

			const newArticle = await response.json()

			console.debug(newArticle._id)
			this.props.history.push(`/articles/article${newArticle._id}`)
		}

		this.setState({validated: true})
	}

	render() {
		return <Container className="pt-5 mt-5">
			<Row className="justify-content-center">
				<Col xl={8}>
					<Form onSubmit={this.handleSubmit} validated={this.state.validated} >
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control as="textarea" name="title" onChange={this.handleTextareaChange} required rows={this.state.title.rows} value={this.state.title.value} />
						</Form.Group>

						<Form.Group controlId="titleImageSrc">
							<Form.Label>Title image URL</Form.Label>
							<Form.Control name="titleImageSrc" onChange={this.handleTextareaChange} required type="url" value={this.state.titleImageSrc}/>
						</Form.Group>

						<Form.Group controlId="titleImageCaption">
							<Form.Label>Title image caption</Form.Label>
							<Form.Control as="textarea" name="titleImageCaption" onChange={this.handleTextareaChange} required rows={this.state.titleImageCaption.rows} value={this.state.titleImageCaption.value}/>
						</Form.Group>

						<Form.Group controlId="subtitle">
							<Form.Label>Subtitle</Form.Label>
							<Form.Control as="textarea" name="subtitle" onChange={this.handleTextareaChange} required rows={this.state.subtitle.rows} value={this.state.subtitle.value} />
						</Form.Group>

						<Form.Group controlId="content">
							<Form.Label>Content</Form.Label>
							<Form.Control as="textarea" name="content" onChange={this.handleTextareaChange} required rows={this.state.content.rows} value={this.state.content.value} />
						</Form.Group>

						<AuthnCond
							authned={
								<Form.Group>
									<Button type="submit">Create article</Button>
								</Form.Group>}

							unauthned={<PopUpDialogManager
								showDialog={false}
								activator={<Button variant="secondary">Log-in to add this article</Button>}
								dialog={<AuthnDialog />} />} />
					</Form>
				</Col>
			</Row>
		</Container>
	}
}

export default CreateArticle
