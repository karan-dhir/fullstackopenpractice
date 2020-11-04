import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Intent, Card, Elevation, Divider } from "@blueprintjs/core";

const Persons = (props) => {
	const {persons, filterString, deletePerson} = props
	return (
		<div>
            {persons.filter(person => person.name.toUpperCase().includes(filterString.toUpperCase()) === true).map(person => <Card interactive={true} elevation={Elevation.TWO}> {person.name} | {person.number} | <Button intent={Intent.DANGER} onClick={()=> deletePerson(person.id)}> Delete </Button></Card>)}
            {/* {persons.filter(person => 
                person.name.toUpperCase().includes(filterString.toUpperCase()) === true)
                .map(person => 
                <Card interactive={true} elevation={Elevation.TWO}> 
                    {person.name} {person.number} 
                    <Button intent={Intent.DANGER} onClick={()=> props.deletePerson(person.id)}> 
                        delete 
                    </Button>
                </Card>)} */}
		</div>
	)
}

export default Persons