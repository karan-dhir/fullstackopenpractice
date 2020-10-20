import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
  return (
  <div>
    <h1>{props.course.name}</h1>
  </div>
  )
}

const Content = (props) => {
  return(
  <div>
    <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
    <Part part={props.parts[1].name} exercise={props.parts[0].exercises} />
    <Part part={props.parts[2].name} exercise={props.parts[0].exercises} />
  </div>
  )
}

const Part = (props) => {
  return(
  <div>
    <p>{props.part} {props.exercise}</p>
  </div>
  )
}

const Total = (props) => {
  return(
  <div>
    <p> Number of exercises {props.totalexercises[0].exercises + props.totalexercises[1].exercises + props.totalexercises[2].exercises}</p>
  </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total totalexercises={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))