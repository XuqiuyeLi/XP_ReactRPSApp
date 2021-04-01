import {RPS, throws} from "./RPS";

describe('play', () => {
    let rps = new RPS();
    let spyObserver;

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
    })
})

describe('history', () => {
    let rps = new RPS();

    describe('when no rounds have been played', () => {
        it('tells the UI no history', () => {
            const spyObserver = {
                noHistory: jest.fn()
            };

            rps.getHistory(spyObserver)

            expect(spyObserver.noHistory).toBeCalledTimes(1)
        })
    })
})
