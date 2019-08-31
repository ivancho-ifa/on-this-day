import React from 'react'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'


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
			subtitle: {
				value: "",
				rows: 1
			},
			article: {
				value: "",
				rows: 10
			}
		}

		this.handleTextareaChange = this.handleTextareaChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)

		this.titleImage = React.createRef();
	}

	handleTextareaChange(event) {
		this.setState({
			[event.target.name]: {
				value: event.target.value
			}
		})
	}

	handleSubmit(event) {
		event.preventDefault()

		console.log(this.state)
		console.log(this.titleImage.current.files[0])
	}

	render() {
		return <Container className="pt-5 mt-5">
			<Row className="justify-content-center">
				<Col xl={8}>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control as="textarea" name="title" onChange={this.handleTextareaChange} rows={this.state.title.rows} />
						</Form.Group>

						<Form.Group controlId="subtitle">
							<Form.Label>Subtitle</Form.Label>
							<Form.Control as="textarea" name="subtitle" onChange={this.handleTextareaChange} rows={this.state.subtitle.rows} />
						</Form.Group>

						<Form.Group controlId="article">
							<Form.Label>Article</Form.Label>
							<Form.Control as="textarea" name="article" onChange={this.handleTextareaChange} rows={this.state.article.rows} />
						</Form.Group>

						<Form.Group controlId="titleImage">
							<Form.Label>Title image</Form.Label>
							<Form.Control accept="image/*" name="titleImage" ref={this.titleImage} type="file" />
						</Form.Group>

						<Form.Group>
							<Button type="submit">Create article</Button>
						</Form.Group>
					</Form>
				</Col>
			</Row>
		</Container>
	}
}

export default CreateArticle
