export const throws = {
    rock: 'rock',
    paper: 'paper',
    scissors: 'scissors'
}

export class Round {
    constructor(p1Throw, p2Throw, result) {
        this.p1Throw = p1Throw;
        this.p2Throw = p2Throw;
        this.result = result;
    }
}

export class RPS {
    constructor(repo) {
        this.repo = repo
    }

    play(p1Throw, p2Throw, observer) {
        if (!(p1Throw in throws && p2Throw in throws)) {
            observer.invalid();
            this.repo.save(new Round(p1Throw, p2Throw, 'invalid'))
        } else if (p1Throw === p2Throw) {
            observer.tie();
            this.repo.save(new Round(p1Throw, p2Throw, 'tie'))
        } else if ((p1Throw === throws.rock && p2Throw === throws.paper) ||
            (p1Throw === throws.paper && p2Throw === throws.scissors) ||
            (p1Throw === throws.scissors && p2Throw === throws.rock)) {
            observer.p2Wins();
            this.repo.save(new Round(p1Throw, p2Throw, 'p2 wins'))
        } else {
            observer.p1Wins();
            this.repo.save(new Round(p1Throw, p2Throw, 'p1 wins'))
        }
    }

    getHistory(observer) {
        if (this.repo.isEmpty()) {
            observer.noHistory();
        } else {
            observer.rounds(this.repo.getAllRounds())
        }
    }
}