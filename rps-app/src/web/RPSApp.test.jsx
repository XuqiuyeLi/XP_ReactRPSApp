import { render } from '@testing-library/react';
import { RPSApp } from './RPSApp';
import userEvent from "@testing-library/user-event";

describe('RPS play form', () => {
  it('invalid input', () => {
    // arrange
    const rpsApp = render(<RPSApp/>)

    // action
    const p1Input = rpsApp.getByLabelText('Player 1:', {selector: 'input'})
    userEvent.type(p1Input, 'flower')
    const p2Input = rpsApp.getByLabelText('Player 2:', {selector: 'input'})
    userEvent.type(p2Input, 'rock')
    expect(rpsApp.queryByText('INVALID!')).not.toBeInTheDocument()
    const button = rpsApp.getByText('PLAY')
    userEvent.click(button)

    // assertion
    expect(rpsApp.queryByText('INVALID!')).toBeInTheDocument()
  })

  it('Player 1 wins!', () => {
    const rpsApp = render(<RPSApp/>)

    const p1Input = rpsApp.getByLabelText('Player 1:', {selector: 'input'})
    userEvent.type(p1Input, 'paper')
    const p2Input = rpsApp.getByLabelText('Player 2:', {selector: 'input'})
    userEvent.type(p2Input, 'rock')
    expect(rpsApp.queryByText('Player 1 wins!')).not.toBeInTheDocument()
    const button = rpsApp.getByText('PLAY')
    userEvent.click(button)

    expect(rpsApp.queryByText('Player 1 wins!')).toBeInTheDocument()
  })

  it('Player 2 wins!', () => {
    const rpsApp = render(<RPSApp/>)

    const p1Input = rpsApp.getByLabelText('Player 1:', {selector: 'input'})
    userEvent.type(p1Input, 'scissors')
    const p2Input = rpsApp.getByLabelText('Player 2:', {selector: 'input'})
    userEvent.type(p2Input, 'rock')
    expect(rpsApp.queryByText('Player 2 wins!')).not.toBeInTheDocument()
    const button = rpsApp.getByText('PLAY')
    userEvent.click(button)

    expect(rpsApp.queryByText('Player 2 wins!')).toBeInTheDocument()
  })

  it('Tie!', () => {
    const rpsApp = render(<RPSApp/>)

    const p1Input = rpsApp.getByLabelText('Player 1:', {selector: 'input'})
    userEvent.type(p1Input, 'paper')
    const p2Input = rpsApp.getByLabelText('Player 2:', {selector: 'input'})
    userEvent.type(p2Input, 'paper')
    expect(rpsApp.queryByText('Tie!')).not.toBeInTheDocument()
    const button = rpsApp.getByText('PLAY')
    userEvent.click(button)

    expect(rpsApp.queryByText('Tie!')).toBeInTheDocument()
  })
})
