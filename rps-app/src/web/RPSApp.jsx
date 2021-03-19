import React, {useState} from "react";

export const RPSApp = (props) => {
    const [p1Throw, setP1Throw] = useState('')
    const [p2Throw, setP2Throw] = useState('')
    const [result, setResult] = useState('')
    const resultObserver = {
        p1wins: () => { setResult('Player 1 wins!') },
        p2wins: () => { setResult('Player 2 wins!') },
        tie: () => { setResult('Tie!') },
        invalid: () => { setResult('INVALID!') },
    }

    const handlePlayFormSubmit = (event) => {
        event.preventDefault()

        props.rps.play(p1Throw, p2Throw, resultObserver)
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
