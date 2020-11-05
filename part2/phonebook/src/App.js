import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import personService from './services/person'
import "@blueprintjs/core/lib/css/blueprint.css"
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { Alert } from '@blueprintjs/core'

const App = () => {
	const [persons, setPersons] = useState([])
	useEffect(()=> {
			personService.getAll().then(initPerson => {
				setPersons(initPerson)
			})
		},[])
	const [ isOpen, setIsOpen ] = useState(false)
	const [ isOpen2, setIsOpen2 ] = useState(false)
	const [ id, setID ] = useState('')
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ filterString, setFilterString ] = useState('')
	const [ errorMessage, setErrorMessage ] = useState({
		message: null,
		category: null
	})

	axios.get('http://localhost:3001/persons').then(
		response => {
		ReactDOM.render(
			<App persons = {response.data}/>, document.getElementById('root')
		)
		}
	)

	useEffect(() => {
		console.log('effect')
		axios.get('http://localhost:3001/persons').then(response => {
		console.log('promise fulfilled')
		setPersons(response.data)
		})
	}, [])

	const handleFilterStringChange = (event) => {
		setFilterString(event.target.value)
	}


	const deletePerson  = (id) => {
		const p = persons.find(person => person.id === id)
		setID(id)
		setIsOpen2(true)
	}

	const addName = (event) => {
		event.preventDefault()
		if (persons.findIndex(person => person.name === newName) > -1 ){
			setIsOpen(true)
		}
		else{
			const obj = {
				name: newName,
				number: newNumber
			}
			personService
				.create(obj)
				.then(newP => {

					const mess = {
						message: `Added ${newP.name}`,
						category: 'success'
					}
					setErrorMessage(mess)
					setTimeout(() => {
						setErrorMessage({...errorMessage, message: null})
					}, 5000)
					setPersons(persons.concat(newP))
					
				})
				.catch(error=>{
					const mess = {
						message: error.response.data.error,
						category: 'error'
					}
					setErrorMessage(mess)
					setTimeout(() => {
						setErrorMessage({...errorMessage, message: null})
					}, 5000)
				})
			
		}
}

const handleNameChange = (event) => {
	setNewName(event.target.value)
	}

const handleNumberChange = (event) => {
	setNewNumber(event.target.value)
	}

const handleContinueConfirm = () => {
	setIsOpen(false)
	const id = persons.find(person=>person.name===newName).id
			const obj = {
				name: newName,
				number: newNumber,
			}
		personService
					.update(id, obj)
					.then(newP => {
						const mess = {
							message: `Added ${newP.name}`,
							category: 'success'
						}
						setErrorMessage(mess)
						setTimeout(() => {
							setErrorMessage({...errorMessage, message: null})
						}, 5000)
						const newPers = persons.map(person=> person.id!==id ? person : newP)
						setPersons(newPers)
						
			})
			.catch(error=>{
						const mess = {
							message: `${obj.name} has already been removed from the database `,
							category: 'error'
						}
						setErrorMessage(mess)
						setTimeout(() => {
							setErrorMessage({...errorMessage, message: null})
						}, 5000)
					})
}

const handleContinueDeny = () => {
	setIsOpen(false)
}

const handleContinueConfirm2 = () => {
	setIsOpen2(false)
	personService
			.deletePerson(id)
			.then(response => {
				setPersons(persons.filter(person=>person.id!==id))
			})
}

const handleContinueDeny2 = () => {
	setIsOpen2(false)
}
	return (
	<div style={{color: "#1F4B99"}}>
		<Alert 
			isOpen={isOpen}
			cancelButtonText="Cancel"
			confirmButtonText="Yes"
			onCancel={handleContinueDeny}
			onConfirm={handleContinueConfirm}
		> 
				<p> 
					{newName} is already added phonebook, replace the old number with new one?' 
				</p>
		</Alert>
		<Alert 
			isOpen={isOpen2}
			cancelButtonText="Cancel"
			confirmButtonText="Yes"
			onCancel={handleContinueDeny2}
			onConfirm={handleContinueConfirm2}
		> 
				<p> 
					Delete this person?
				</p>
		</Alert>
		<h2>Phonebook</h2>
		<Notification m={errorMessage} />
		<Filter handleFilterStringChange={handleFilterStringChange}/>
		<h2> Add a new </h2>
		<PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
		<h2>Numbers</h2>
		<Persons persons={persons} filterString={filterString} deletePerson={deletePerson} setIsOpen2={setIsOpen2}/>
	</div>
	)
}

export default App
