export const throws = {
    rock: 'rock',
    paper: 'paper',
    scissors: 'scissors'
}

export class Round {
    constructor(p1, p2, result) {
        this.p1 = p1
        this.p2 = p2
        this.result = result
    }
}

export class RPS {
    constructor(historyRepo) {
        this.historyRepo = historyRepo
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

    loadHistory(observer) {
        if (this.historyRepo.isEmpty()) {
            observer.displayHistoryEmpty()
        } else {
            observer.displayHistory(this.historyRepo.getHistory())
        }
    }
}