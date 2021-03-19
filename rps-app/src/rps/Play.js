export const throws = {
    rock: 'rock',
    paper: 'paper',
    scissors: 'scissors'
}

export const result = {
    p1Wins: 'P1 Wins',
    p2Wins: 'P2 Wins',
    tie: 'Tie',
    invalid: 'Invalid input'
}

export function play(p1Throw, p2Throw) {
    if (!(p1Throw in throws && p2Throw in throws)) {
        return result.invalid
    } else if (p1Throw === p2Throw) {
        return result.tie
    } else if ((p1Throw === throws.rock && p2Throw === throws.paper) ||
        (p1Throw === throws.paper && p2Throw === throws.scissors) ||
        (p1Throw === throws.scissors && p2Throw === throws.rock)) {
        return result.p2Wins;
    } else {
        return result.p1Wins;
    }
}