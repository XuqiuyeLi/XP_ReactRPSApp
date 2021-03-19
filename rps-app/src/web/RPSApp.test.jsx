import React from 'react';
import {render} from '@testing-library/react';
import {RPSApp} from './RPSApp';
import userEvent from "@testing-library/user-event";
import {any} from "expect";

describe('RPS play form', () => {
    let rpsApp

    describe('When the user input is invalid', () => {
        beforeEach(() => {
            const alwaysInvalid = {
                play: (p1Throw, p2Throw, observer) => observer.invalid(),
            }

            rpsApp = render(<RPSApp rps={alwaysInvalid}/>)
        })

        it('shows no result by default', () => {
            expect(rpsApp.queryByText('INVALID!')).not.toBeInTheDocument()
        })

        it('shows that the input was invalid', () => {
            submitForm();

            expect(rpsApp.queryByText('INVALID!')).toBeInTheDocument()
        })
    })

    describe('When player one is the winner', () => {
        beforeEach(() => {
            const alwaysP1Wins = {
                play: (p1Throw, p2Throw, observer) => observer.p1Wins(),
            }

            rpsApp = render(<RPSApp rps={alwaysP1Wins}/>)
        })

        it('shows no result by default', () => {
            expect(rpsApp.queryByText('Player 1 wins!')).not.toBeInTheDocument()
        })

        it('shows that player 1 is the winner', () => {
            submitForm();

            expect(rpsApp.queryByText('Player 1 wins!')).toBeInTheDocument()
        })
    })

    describe('When player two is the winner', () => {
        beforeEach(() => {
            const alwaysP2Wins = {
                play: (p1Throw, p2Throw, observer) => observer.p2Wins(),
            }

            rpsApp = render(<RPSApp rps={alwaysP2Wins}/>)
        })

        it('shows no result by default', () => {
            expect(rpsApp.queryByText('Player 2 wins!')).not.toBeInTheDocument()
        })

        it('shows that player 2 is the winner', () => {
            submitForm();

            expect(rpsApp.queryByText('Player 2 wins!')).toBeInTheDocument()
        })
    })

    describe('When the game is a tie', () => {
        beforeEach(() => {
            const alwaysTie = {
                play: (p1Throw, p2Throw, observer) => observer.tie(),
            }

            rpsApp = render(<RPSApp rps={alwaysTie}/>)
        })

        it('shows no result by default', () => {
            expect(rpsApp.queryByText('Tie!')).not.toBeInTheDocument()
        })

        it('shows that the game was a tie', () => {
            submitForm();

            expect(rpsApp.queryByText('Tie!')).toBeInTheDocument()
        })
    })

    describe('When the game is submitted', () => {
        it('sends the users inputs to the play request', () => {
            const rpsSpy = {
                play: jest.fn()
            }
            rpsApp = render(<RPSApp rps={rpsSpy}/>)

            setInputValue('Player 1:', 'paper')
            setInputValue('Player 2:', 'rock')
            submitForm()

            expect(rpsSpy.play).toBeCalledWith('paper', 'rock', any(Object))
        })
    })

    function submitForm() {
        const button = rpsApp.getByText('PLAY')
        userEvent.click(button)
    }

    function setInputValue(labelText, input) {
        const p1Input = rpsApp.getByLabelText(labelText, {selector: 'input'})
        userEvent.type(p1Input, input)
    }
})
