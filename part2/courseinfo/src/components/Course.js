import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
    return(
    <div>
        <p>{props.part} {props.exercise}</p>
    </div>
    )
}


const Header = (props) => {
    return (
    <div>
        <h1>{props.course.name}</h1>
    </div>
    )
}

const Content = (props) => {
    const {parts} = props
    const reducer = (part, currentValue) => {
        return part + currentValue.exercises
    }
    const total = parts.reduce(reducer, 0);
    return(
    <div>
        {parts.map(part => 
        <Part key={part.id} part={part.name} exercise={part.exercises} />
        )}
        <b>total of {total} exercises</b>
    </div>
    )
}
const Course = (props) => {
    return (
    <div>
        <Header course={props.course} />
        <Content parts={props.course.parts} />
    </div>
    )
}

export default Course;