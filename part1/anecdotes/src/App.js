import React, {useState} from 'react'
import Button from './components/Button'
import Title from './components/Title'
import Anecdote from './components/Anecdote'

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
            <Anecdote
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
            <Anecdote
                text={props.anecdotes[indexOfBestVoted()]}
                vote={Math.max(...points)}
            />
        </div>
    )
}

export default App