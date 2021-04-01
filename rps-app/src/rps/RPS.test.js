import {Round, RPS, throws} from "./RPS";

describe('play', () => {
    let rps;
    let spyObserver, spyRepo;

    beforeEach(() => {
        spyRepo = {
            save: jest.fn()
        }
        rps = new RPS(spyRepo)
    })

    describe('p1wins', () => {
        beforeEach(() => {
            spyObserver = {
                p1Wins: jest.fn()
            };
        })

        it('rock vs scissors', () => {
            rps.play(throws.rock, throws.scissors, spyObserver)

            expect(spyObserver.p1Wins).toBeCalledTimes(1)
        })

        it('scissors vs paper', () => {
            rps.play(throws.scissors, throws.paper, spyObserver)

            expect(spyObserver.p1Wins).toBeCalledTimes(1)
        })

        it('paper vs rock', () => {
            rps.play(throws.paper, throws.rock, spyObserver)

            expect(spyObserver.p1Wins).toBeCalledTimes(1)
        })

        it('saves to repo', () => {
            rps.play(throws.paper, throws.rock, spyObserver)

            expect(spyRepo.save).toBeCalledTimes(1)
            expect(spyRepo.save).toBeCalledWith(new Round(throws.paper, throws.rock, 'p1 wins'))
        });
    })

    describe('p2wins', () => {
        beforeEach(() => {
            spyObserver = {
                p2Wins: jest.fn()
            };
        })

        it('scissors vs rock', () => {
            rps.play(throws.scissors, throws.rock, spyObserver)

            expect(spyObserver.p2Wins).toBeCalledTimes(1)
        })

        it('paper vs scissors', () => {
            rps.play(throws.paper, throws.scissors, spyObserver)

            expect(spyObserver.p2Wins).toBeCalledTimes(1)
        })

        it('rock vs paper', () => {
            rps.play(throws.rock, throws.paper, spyObserver)

            expect(spyObserver.p2Wins).toBeCalledTimes(1)
        })

        it('saves to repo', () => {
            rps.play(throws.rock, throws.paper, spyObserver)

            expect(spyRepo.save).toBeCalledTimes(1)
            expect(spyRepo.save).toBeCalledWith(new Round(throws.rock, throws.paper, 'p2 wins'))
        });
    })

    describe('tie', () => {
        beforeEach(() => {
            spyObserver = {
                tie: jest.fn()
            };
        })

        it('paper vs paper', () => {
            rps.play(throws.paper, throws.paper, spyObserver)

            expect(spyObserver.tie).toBeCalledTimes(1)
        })

        it('rock vs rock', () => {
            rps.play(throws.rock, throws.rock, spyObserver)

            expect(spyObserver.tie).toBeCalledTimes(1)
        })

        it('scissors vs scissors', () => {
            rps.play(throws.scissors, throws.scissors, spyObserver)

            expect(spyObserver.tie).toBeCalledTimes(1)
        })

        it('saves to repo', () => {
            rps.play(throws.paper, throws.paper, spyObserver)

            expect(spyRepo.save).toBeCalledTimes(1)
            expect(spyRepo.save).toBeCalledWith(new Round(throws.paper, throws.paper, 'tie'))
        });
    })

    describe('invalid', () => {
        beforeEach(() => {
            spyObserver = {
                invalid: jest.fn()
            };
        })

        it('rock vs invalid', () => {
            rps.play(throws.rock, Math.random(), spyObserver)

            expect(spyObserver.invalid).toBeCalledTimes(1)
        })

        it('invalid vs paper', () => {
            rps.play(Math.random(), throws.rock, spyObserver)

            expect(spyObserver.invalid).toBeCalledTimes(1)
        })

        it('invalid vs invalid', () => {
            rps.play(Math.random(), Math.random(), spyObserver)

            expect(spyObserver.invalid).toBeCalledTimes(1)
        })

        it('saves to repo', () => {
            rps.play('sailboat', throws.rock, spyObserver)

            expect(spyRepo.save).toBeCalledTimes(1)
            expect(spyRepo.save).toBeCalledWith(new Round('sailboat', throws.rock, 'invalid'))
        });
    })
})

describe('getHistory', () => {
    let rps = new RPS();

    describe('when no rounds have been played', () => {
        it('tells the UI no history', () => {
            const spyObserver = {
                noHistory: jest.fn()
            };

            const repoStub = {
                isEmpty: () => {
                    return true
                }
            }

            const rps = new RPS(repoStub)

            rps.getHistory(spyObserver)

            expect(spyObserver.noHistory).toBeCalledTimes(1)
        })
    })

    describe('when rounds have been played', () => {
        it('tells the UI the played rounds', () => {
            const spyObserver = {
                rounds: jest.fn()
            }

            const repoStub = {
                isEmpty: () => {
                    return false
                },
                getAllRounds: () => {
                    return [new Round(throws.scissors, throws.paper, 'p1 wins')]
                }
            }

            const rps = new RPS(repoStub)

            rps.getHistory(spyObserver)

            expect(spyObserver.rounds).toBeCalledTimes(1)
            expect(spyObserver.rounds).toBeCalledWith([new Round(throws.scissors, throws.paper, 'p1 wins')])
        });
    });
})
