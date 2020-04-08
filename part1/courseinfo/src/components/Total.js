import React from 'react'

const Total = (props) => {
    const parts = props.course.parts
    const totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <p>
            <strong>
                total of {totalAmount} exercises
             </strong>
        </p>
    )
}

export default Total