import React from 'react'
import StatisticalValue from './components/StatisticalValue'

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
          <StatisticalValue text='good' value={good} />
          <StatisticalValue text='neutral' value={neutral} />
          <StatisticalValue text='bad' value={bad} />
          <StatisticalValue text='all' value={count} />
          <StatisticalValue text='average' value={average(count)} />
          <StatisticalValue text='positive' value={`${positive(count)} %`} />
        </table>
      )
    }
  }

  export default Statistics