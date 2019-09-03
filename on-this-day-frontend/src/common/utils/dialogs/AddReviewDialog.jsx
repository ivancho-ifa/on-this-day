import React from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import * as Constants from '../Constants'


class AddReviewDialog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			rating: undefined,
			title: undefined,
			review: undefined,

			validated: false
		}

		this.handleAddReview = this.handleAddReview.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleClose = this.handleClose.bind(this)
	}

	handleClose() {
		this.props.onClose()
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		}, () => {
			console.debug(this.state)
		});
	}

	handleAddReview(event) {
		event.preventDefault();

		const form = event.currentTarget

		console.debug(form)

		if (!!form.checkValidity()) {
			/** @todo Do this smarter. Don't pass it in props. */
			fetch(`http://localhost:3003/articles/article-${this.props.articleID}/add-review`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					rating: this.state.rating,
					title: this.state.title,
					review: this.state.review
				})
			})

			this.handleClose()
		}

		this.setState({validated: true})
	}

	generateRatingSelect() {
		const options = [<option key="undefined" value={undefined}>{undefined}</option>]
		for (let rating = 1; rating <= Constants.maxArticleRating; ++rating) {
			options.push(<option key={rating}>{rating}</option>)
		}

		return <Form.Control
			as="select"
			form="addReviewForm"
			name="rating"
			onChange={this.handleChange}
			required
			value={this.state.value}>

			{options}
		</Form.Control>
	}

	render() {
		return (
			<Modal
				show={this.props.show}
				onHide={this.handleClose}>

				<Modal.Header closeButton>
					<Modal.Title>Review</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Group controlId="rating">
							<Form.Label>Rating</Form.Label>

							{this.generateRatingSelect()}

							<Form.Control.Feedback type="invalid">
								You must rate the article in order to add a review.
							</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								as="textarea"
								form="addReviewForm"
								name="title"
								onChange={this.handleChange}
								required={this.state.review && this.state.review !== ""}
								rows="1"
								value={this.state.title}/>
						</Form.Group>

						<Form.Group controlId="review">
							<Form.Label>Review</Form.Label>
							<Form.Control
								as="textarea"
								form="addReviewForm"
								name="review"
								onChange={this.handleChange}
								rows="8"
								value={this.state.review} />
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Form id="addReviewForm" validated={this.state.validated} onSubmit={this.handleAddReview}>
						<Form.Group
							controlId="reviewSubmit"
							className="mb-0">

							<Button
								variant="primary"
								type="submit">

								Submit review
							</Button>
						</Form.Group>
					</Form>
				</Modal.Footer>
			</Modal>)
	}
}

export default AddReviewDialog
