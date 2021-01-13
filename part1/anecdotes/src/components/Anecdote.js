import React from 'react'

const Anecdote = (props) => {
    return (
        <div>
            <div>{props.text}</div>
            <div>has {props.vote} votes</div>
        </div>
    )
}

export default Anecdote