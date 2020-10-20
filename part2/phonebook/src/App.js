import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import personService from './services/person'

const Notification = (props) => {
	if(props.m.message === null){
		return null
	}
	if(props.m.category === "success"){
		return(
			<div className="success">
				{props.m.message}
			</div>
		)
	}
	return(
		<div className="error">
			{props.m.message}
		</div>
	)
	
}

const Filter = (props) => {
  const {handleFilterStringChange} = props
  return (
    <div>
        filter shown with: <input onChange={handleFilterStringChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  const {addName, handleNameChange, handleNumberChange} = props
  return (
    <form onSubmit={addName}>
      <div>
        name: <input onChange={handleNameChange}/>
      </div>
      <div>number: <input onChange={handleNumberChange}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  const {persons, filterString, deletePerson} = props
  return (
    <div>
    {persons.filter(person => person.name.toUpperCase().includes(filterString.toUpperCase()) === true).map(person => <p key={person.name}> {person.name} {person.number} <button onClick={()=> props.deletePerson(person.id)}>delete</button></p>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(()=> {
		personService.getAll().then(initPerson => {
			setPersons(initPerson)
		})
	},[])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setFilterString ] = useState('')
  const [errorMessage, setErrorMessage] = useState({
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
		const p = persons.find( person => person.id === id)
		if(window.confirm(`Delete ${p.name} ?`)){
			personService
				.deletePerson(id)
				.then(response => {
					setPersons(persons.filter(person=>person.id!==id))
				})
		}
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.findIndex(person => person.name === newName) > -1 ){
      if(window.confirm(newName + ' is already added phonebook, replace the old number with new one?')){
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
					setNewName('')
					setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification m={errorMessage} />
      <Filter handleFilterStringChange={handleFilterStringChange}/>
      <h2> Add a new </h2>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterString={filterString} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
