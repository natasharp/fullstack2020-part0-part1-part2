import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = ({ value }) => {
  return <h1>{value}</h1>
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const count = good + bad + neutral
  const average = (count) => {
    if (count === 0) {
      return 0
    } else {
      return (good - bad) / count
    }
  }
  const positive = (count) => {
    if (count === 0) {
      return 0
    } else {
      return good / count * 100
    }
  }

  if (count === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  else {
    return (
      <table>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='all' value={count} />
        <Statistic text='average' value={average(count)} />
        <Statistic text='positive' value={`${positive(count)} %`} />
      </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodByOne = () => setGood(good + 1)
  const increaseNeutralByOne = () => setNeutral(neutral + 1)
  const increaseBadByOne = () => setBad(bad + 1)

  return (
    <div>
      <Display value='give feedback' />
      <Button
        handleClick={increaseGoodByOne}
        text='good'
      />
      <Button
        handleClick={increaseNeutralByOne}
        text='neutral'
      />
      <Button
        handleClick={increaseBadByOne}
        text='bad'
      />
      <Display value='statistics' />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
