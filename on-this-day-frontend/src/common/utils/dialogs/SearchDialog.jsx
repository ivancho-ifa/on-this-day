import React from 'react'

import { withRouter } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

const MONTHS = [
	"january",
	"february",
	"march",
	"april",
	"may",
	"june",
	"july",
	"august",
	"september",
	"october",
	"november",
	"december"
]
Object.freeze(MONTHS)

function daysInMonth(monthValue, year) {
	if (monthValue === undefined) {
		return 31
	}

	switch (monthValue) {
		case 0: return 31
		case 1: return (year === undefined && year % 4 === 0) ? 29 : 28
		case 2: return 31
		case 3: return 30
		case 4: return 31
		case 5: return 30
		case 6: return 31
		case 7: return 31
		case 8: return 30
		case 9: return 31
		case 10: return 30
		case 11: return 31

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
			monthValue: undefined,
			year: undefined,
			keywords: undefined
		}

		this.handleSearch = this.handleSearch.bind(this)
	}

	handleSearch() {
		this.props.history.push(`/articles/filter/${JSON.stringify(this.state)}`)
		this.props.onClose()
	}

	handleChange(event) {
		/** @todo Do this not on every change but on every submit. */
		const newValue = event.target.name === "month" ? Number(event.target.value) + 1 : event.target.value

		this.setState({
			[event.target.name]: newValue
		});
	}

	genDateSelect(monthValue, year) {
		const lastDayOfMonth = daysInMonth(monthValue , year)

		let options = [<option key="undefined" value={undefined}>{undefined}</option>]
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
			name="date"
			onChange={(event) => {this.handleChange(event)}}
			style={{
				textTransform: "capitalize"
			}}
			value={this.state.date}>

			{options}
		</Form.Control>
	}

	genMonthSelect() {
		let options = [<option key="undefined" value={undefined}>{undefined}</option>]
		MONTHS.forEach((monthName, monthValue) => {
			options.push(
				<option
					key={monthValue}
					value={monthValue}>

					{monthName}
				</option>)})

		return <Form.Control
			as="select"
			defaultValue={undefined}
			name="month"
			onChange={(event) => {this.handleChange(event)}}
			style={{
				textTransform: "capitalize"
			}}
			value={this.state.monthValue}>

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
									{this.genDateSelect(this.state.monthValue, this.state.year)}
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
									<Form.Control type="number" />
								</Form.Group>
							</Col>
						</Form.Row>
						<Form.Group controlId="searchKeywords">
							<Form.Label>Keywords</Form.Label>
							<Form.Control disabled type="search" />
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer>
					<Form>
						<Form.Group controlId="searchSubmit">
							<Button
								onClick={this.handleSearch}
								variant="primary">

								Search
							</Button>
						</Form.Group>
					</Form>
				</Modal.Footer>
			</Modal>
		)
	}
}

export default withRouter(SearchDialog)
