import { play, throws, result } from "./Play";

describe('play', () => {
    describe('p1wins', () => {
        it('rock vs scissors', () => {
            expect(play(throws.rock, throws.scissors)).toBe(result.p1Wins)
        })

        it('scissors vs paper', () => {
            expect(play(throws.scissors, throws.paper)).toBe(result.p1Wins)
        })

        it('paper vs rock', () => {
            expect(play(throws.paper, throws.rock)).toBe(result.p1Wins)
        })
    })

    describe('p2wins', () => {
        it('scissors vs rock', () => {
            expect(play(throws.scissors, throws.rock)).toBe(result.p2Wins)
        })

        it('paper vs scissors', () => {
            expect(play(throws.paper, throws.scissors)).toBe(result.p2Wins)
        })

        it('rock vs paper', () => {
            expect(play(throws.rock, throws.paper)).toBe(result.p2Wins)
        })
    })

    describe('tie', () => {
        it('paper vs paper', () => {
            expect(play(throws.paper, throws.paper)).toBe(result.tie)
        })

        it('rock vs rock', () => {
            expect(play(throws.rock, throws.rock)).toBe(result.tie)
        })

        it('scissors vs scissors', () => {
            expect(play(throws.scissors, throws.scissors)).toBe(result.tie)
        })
    })

    describe('invalid', () => {
        it('rock vs invalid', () => {
            expect(play(throws.rock, Math.random())).toBe(result.invalid)
        })

        it('invalid vs paper', () => {
            expect(play(Math.random(), throws.paper)).toBe(result.invalid)
        })

        it('invalid vs invalid', () => {
            expect(play(Math.random(), Math.random())).toBe(result.invalid)
        })
    })
})