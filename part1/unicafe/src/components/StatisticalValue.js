import React from 'react'

const StatisticalValue = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

export default StatisticalValue

