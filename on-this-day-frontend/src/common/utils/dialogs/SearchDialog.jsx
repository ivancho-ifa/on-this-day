import React from 'react'

import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'


const months = {
	january: "january",
	february: "february",
	march: "march",
	april: "april",
	may: "may",
	june: "june",
	july: "july",
	august: "august",
	september:  "september",
	october: "october",
	november:"november",
	december: "december"
}
Object.freeze(months)

function daysInMonth(month, year) {
	if (month === undefined) {
		return 31
	}

	switch (month) {
		case months.january: return 31
		case months.february:
			return (year === undefined && year % 4 === 0) ? 29 : 28
		case months.march: return 31
		case months.april: return 30
		case months.may: return 31
		case months.june: return 30
		case months.july: return 31
		case months.august: return 31
		case months.september: return 30
		case months.october: return 31
		case months.november: return 30
		case months.december: return 31

		default:
			throw new Error("Unexisting month!")
	}
}


/**
 * Search dialog.
 *
 * @param {boolean} props.show - Whether the dialog should be rendered.
 * @param {Function} props.onClose - Callback to execute when closing the dialog.
 *
 * @todo Make this class reusable for all kinds of dialogs.
 */

class SearchDialog extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			date: undefined,
			month: undefined,
			year: undefined,
			keywords: undefined
		}

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleFormChange(event) {
		console.debug(`event.target.name: ${event.target.name}`)
		console.debug(`event.target.value: ${event.target.value}`)

		this.setState({
			[event.target.name]: event.target.value
		}, () => {
			console.debug(`Updating this.state to ${JSON.stringify(this.state)}.`)
		});
	}

	handleSubmit(event) {
		event.preventDefault()

		let filters = {}
		if (this.state.date) {
			filters.date = this.state.date
		}
		if (this.state.month) {
			filters.month = this.state.month
		}
		if (this.state.year) {
			filters.year = this.state.year
		}
		if (this.state.keywords) {
			filters.keywords = this.state.keywords
		}

		console.debug(filters)
	}

	genDateSelect(month, year) {
		const lastDayOfMonth = daysInMonth(month , year)
		console.debug(`Last day of month(${month}) is ${lastDayOfMonth}.`)

		let options = [<option key="undefined" value={undefined}>undefined</option>]
		for (let date = 1; date <= lastDayOfMonth; ++date) {
			options.push(<option
				key={date}
				value={date}>

				{date}
			</option>)
		}

		return <Form.Control
			as="select"
			defaultValue={undefined}
			form="searchSubmitForm"
			name="date"
			onChange={(event) => {this.handleFormChange(event)}}
			style={{
				textTransform: "capitalize"
			}}
			value={this.state.date}>

			{options}
		</Form.Control>
	}

	genMonthSelect() {
		let options = [<option key="undefined" value={undefined}>undefined</option>]
		for (const key in months) {
			if (months.hasOwnProperty(key)) {
				const month = months[key];

				options.push(<option
					key={month}
					value={month}>

					{month}
				</option>)
			}
		}

		return <Form.Control
			as="select"
			defaultValue={undefined}
			form="searchSubmitForm"
			name="month"
			onChange={(event) => {this.handleFormChange(event)}}
			style={{
				textTransform: "capitalize"
			}}
			value={this.state.month}>

			{options}
		</Form.Control>
	}

	render() {
		const handleClose = () => { this.props.onClose() }

		return (
			<Modal show={this.props.show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Search</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Form>
						<Form.Row>
							<Col>
								<Form.Group controlId="searchDate">
									<Form.Label>Date</Form.Label>
									{this.genDateSelect(this.state.month, this.state.year)}
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="searchMonth">
									<Form.Label>Month</Form.Label>
									{this.genMonthSelect()}
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="searchYear">
									<Form.Label>Year</Form.Label>
									<Form.Control type="number" form="searchSubmitForm" />
								</Form.Group>
							</Col>
						</Form.Row>
						<Form.Group controlId="searchKeywords">
							<Form.Label>Keywords</Form.Label>
							<Form.Control type="search" form="searchSubmitForm" />
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Form id="searchSubmitForm" onSubmit={this.handleSubmit}>
						<Form.Group controlId="searchSubmit">
							<Button variant="primary" href={`/articles/filter/${JSON.stringify(this.state)}`}>Search</Button>
						</Form.Group>
					</Form>
				</Modal.Footer>
			</Modal>
		)
	}
}

export default SearchDialog
