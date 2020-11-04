import React from 'react'
import { Card, Elevation, InputGroup } from "@blueprintjs/core";


const Filter = (props) => {
	const {handleFilterStringChange} = props
	return (
	<Card interactive={true} elevation={Elevation.TWO} style={{padding: 50}}>
		Filter numbers shown with:
		<InputGroup placeholder="Search..." onChange={handleFilterStringChange} />
	</Card>
	)
}

export default Filter