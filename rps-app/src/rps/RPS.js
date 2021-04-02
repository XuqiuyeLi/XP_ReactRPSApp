export const throws = {
    rock: 'rock',
    paper: 'paper',
    scissors: 'scissors'
}

export class RPS {
    constructor(repository) {
        this.repo = repository
    }

    play(p1Throw, p2Throw, observer) {
        if (!(p1Throw in throws && p2Throw in throws)) {
            observer.invalid();
        } else if (p1Throw === p2Throw) {
            observer.tie();
        } else if ((p1Throw === throws.rock && p2Throw === throws.paper) ||
            (p1Throw === throws.paper && p2Throw === throws.scissors) ||
            (p1Throw === throws.scissors && p2Throw === throws.rock)) {
            observer.p2Wins();
        } else {
            observer.p1Wins();
        }
    }

    getHistory(observer) {
        observer.noHistory()
    }
}