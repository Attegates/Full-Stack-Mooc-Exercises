import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    if (props.all > 0) {
        return (
            <div>
                <h2>statistics</h2>
                <Statistic text='good' value={props.good} />
                <Statistic text='neutral' value={props.neutral} />
                <Statistic text='bad' value={props.bad} />
                <Statistic text='all' value={props.all} />
                <Statistic text='average' value={props.average} />
                <Statistic text='positive' value={props.positive} sign='%' />
            </div>
        )
    }
    return (
        <div>
            <h2>No feedback given</h2>
        </div>
    )
}

const Statistic = ({text, value, sign}) => {
    return (
        <div>
            <p>{text} {value} {sign} </p>
        </div>
    )
}

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>
            {text}
        </button>
    )
}


const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    const all = good + neutral + bad
    const average = all > 0 ? (good - bad) / all : 0
    const positive = all > 0 ? good / all * 100 : 0

    return (
        <div>
            <h2>give feedback</h2>
            <Button handleClick={handleGoodClick} text='good' />
            <Button handleClick={handleNeutralClick} text='neutral' />
            <Button handleClick={handleBadClick} text='bad' />
            <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
