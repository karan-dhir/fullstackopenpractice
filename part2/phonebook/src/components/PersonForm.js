import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Intent, Card, Elevation, InputGroup } from "@blueprintjs/core";

const PersonForm = (props) => {
	const {addName, handleNameChange, handleNumberChange} = props
	return (
		<form onSubmit={addName}>
			<Card interactive={true} elevation={Elevation.TWO} style={{padding: 50}}>
				Name:
				<br></br>
				<InputGroup placeholder="Name" onChange={handleNameChange} />
				<br></br>
				Number:
				<InputGroup placeholder="Number" onChange={handleNumberChange} />
				<br></br>
				<Button intent={Intent.PRIMARY} text="Add" type="submit"/>
			</Card>
		</form>
	)
}

export default PersonForm