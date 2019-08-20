import React from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'


function AddReviewDialog(props) {
	function handleClose() {props.onClose()}

	return <Modal
		show={props.show}
		onHide={handleClose}>

		<Modal.Header closeButton>
			<Modal.Title>Review</Modal.Title>
		</Modal.Header>

		<Modal.Body>
			<Form>
				<Form.Group controlId="rating">
					<Form.Label>Rating</Form.Label>
					<Form.Control as="select">
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</Form.Control>
				</Form.Group>
				<Form.Group controlId="review">
					<Form.Label>Review</Form.Label>
					<Form.Control as="textarea" rows="8" />
				</Form.Group>
			</Form>
		</Modal.Body>

		<Modal.Footer>
			<Form>
				<Form.Group
					controlId="reviewSubmit"
					className="mb-0">

					<Button
						variant="primary"
						onClick={handleClose}>

						Submit review
					</Button>
				</Form.Group>
			</Form>
		</Modal.Footer>
	</Modal>
}

export default AddReviewDialog
