import React from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'


/**
 * Search dialog.
 *
 * @param {boolean} props.show - Whether the dialog should be rendered.
 * @param {Function} props.onClose - Callback to execute when closing the dialog.
 *
 * @todo Make this class reusable for all kinds of dialogs.
 */

function SearchDialog(props) {
	function handleClose(){ props.onClose() }

	return (
		<Modal show={props.show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Search</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form>
					<Form.Group controlId="searchDate">
						<Form.Label>Date</Form.Label>
						<Form.Control type="date" />
					</Form.Group>
					<Form.Group controlId="searchKeywords">
						<Form.Label>Keywords</Form.Label>
						<Form.Control type="search" />
					</Form.Group>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Form>
					<Form.Group controlId="searchSubmit">
						<Button variant="primary" onClick={handleClose}>Search</Button>
					</Form.Group>
				</Form>
			</Modal.Footer>
		</Modal>
	)
}

export default SearchDialog
