import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({ title }) => <h1>{title}</h1>

const DisplayAnecdote = (props) => {
  return (
    <div>
      <div>{props.text}</div>
      <div>has {props.vote} votes</div>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = (props) => {
  const votes = Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf, 0)
  const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return (Math.floor(Math.random() * (max - min + 1)) + min)
  }

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(votes)

  const getNextAnecdote = () => setSelected(random(0, props.anecdotes.length - 1))
  const voteForAnecdote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }
  const indexOfBestVoted = () => points.indexOf(Math.max(...points))

  return (
    <div>
      <Title title='Anecdote of the day' />
      <DisplayAnecdote
        text={props.anecdotes[selected]}
        vote={points[selected]}
      />
      <Button
        handleClick={voteForAnecdote}
        text='vote'
      />
      <Button
        handleClick={getNextAnecdote}
        text='next anecdote'
      />
      <Title title='Anecdote with most votes' />
      <DisplayAnecdote
        text={props.anecdotes[indexOfBestVoted()]}
        vote={Math.max(...points)}
      />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
