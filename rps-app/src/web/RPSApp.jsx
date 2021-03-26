import React, {useState} from "react";
import {play, result as results} from "../rps/Play";

const RPSApp = () => {
    const [p1Throw, setP1Throw] = useState('')
    const [p2Throw, setP2Throw] = useState('')
    const [result, setResult] = useState('')

    const handlePlayFormSubmit = (event) => {
        event.preventDefault()

        setResult(showResult(play(p1Throw, p2Throw)))
    }

    const showResult = (result) => {
        if (result === results.p1Wins) return 'Player 1 wins!'
        if (result === results.p2Wins) return 'Player 2 wins!'
        if (result === results.tie) return 'Tie!'
        else return 'INVALID!'
    }

    const handlePlayer1Input = (event) => {
        setP1Throw(event.target.value)
    }

    const handlePlayer2Input = (event) => {
        setP2Throw(event.target.value)
    }

    return (
        <div className="RPSApp">
            <form onSubmit={(event) => handlePlayFormSubmit(event)}>
                <label>
                    Player 1:
                    <input type="text" value={p1Throw} onChange={handlePlayer1Input}/>
                </label>
                <label>
                    Player 2:
                    <input type="text" value={p2Throw} onChange={handlePlayer2Input}/>
                </label>
                <button type="submit">PLAY</button>
            </form>
            <div>{result}</div>
        </div>
    );
}

export default RPSApp
