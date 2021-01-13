import React, { useState } from 'react'
import Button from './components/Button'
import Title from './components/Title'

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
            <Title value='statistics' />
            <Statistics
                good={good}
                neutral={neutral}
                bad={bad} />
        </div>
    )
}

export default App