import React from 'react'


/**
 * Packs a dialog and its activator.
 *
 * Sets some handlers to activator and dialog to enable showing/hiding of the dialog.
 *
 * @param {boolean} props.showDialog - Whether the dialog should be rendered.
 * @param {HTMLElement} props.activator - The activator of the dialog (most commonly a button).
 * @param {Modal} props.dialog - The dialog.
 *
 * @todo Validate properties.
 */

function PopUpDialogManager(props) {
	const [showDialog, setShowDialog] = React.useState(props.showDialog)

	function handleCloseDialog() { setShowDialog(false) }
	function handleShowDialog() { setShowDialog(true) }

	return <React.Fragment>
		{React.cloneElement(props.activator, { onClick: handleShowDialog })}
		{React.cloneElement(props.dialog, { show: showDialog, onClose: handleCloseDialog })}
	</React.Fragment>
}

export default PopUpDialogManager
