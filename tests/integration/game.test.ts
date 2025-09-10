import { renderGrid } from 'tests/utils'
import { describe, it } from 'vitest'
import { Game } from '@/core/Game'
import { Player } from '@/core/Player'
import { Position } from '@/core/Position'

function createGame() {
  const player1 = new Player()
  const player2 = new Player()
  const game = new Game(player1, player2)

  return game
}

describe('integration', () => {
  it('should initialize game with Pieces at good position', ({ expect }) => {
    const game = createGame()

    expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
      "
      8 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
      7 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙ 
      6 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
      5 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
      4 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
      3 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
      2 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟ 
      1 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
        a b c d e f g h 
      "
    `)
  })

  describe('pawn', () => {
    describe('forward moves', () => {
      it('should move to 1 case forward', ({ expect }) => {
        const game = createGame()
        game.executeMove(new Position('d2'), new Position('d3'))

        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙ 
          6 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          5 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          4 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          3 ⬚ ⬚ ⬚ ♟ ⬚ ⬚ ⬚ ⬚ 
          2 ♟ ♟ ♟ ⬚ ♟ ♟ ♟ ♟ 
          1 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
            a b c d e f g h 
          "
        `)
      })

      it('should move to 2 case forward', ({ expect }) => {
        const game = createGame()
        game.executeMove(new Position('d2'), new Position('d4'))

        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙ 
          6 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          5 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          4 ⬚ ⬚ ⬚ ♟ ⬚ ⬚ ⬚ ⬚ 
          3 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          2 ♟ ♟ ♟ ⬚ ♟ ♟ ♟ ♟ 
          1 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
            a b c d e f g h 
          "
        `)
      })

      it('should not move to 3 case forward', ({ expect }) => {
        const game = createGame()
        const moveToNotAuthorizedPosition = () => game.executeMove(new Position('d2'), new Position('d5'))

        expect(moveToNotAuthorizedPosition).toThrowError('Illegal move')
      })

      it('should not move to 1 case forward, when a piece is front of', ({ expect }) => {
        const game = createGame()
        game.executeMove(new Position('d2'), new Position('d4'))
        game.executeMove(new Position('d7'), new Position('d5'))

        // initial position
        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7 ♙ ♙ ♙ ⬚ ♙ ♙ ♙ ♙ 
          6 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          5 ⬚ ⬚ ⬚ ♙ ⬚ ⬚ ⬚ ⬚ 
          4 ⬚ ⬚ ⬚ ♟ ⬚ ⬚ ⬚ ⬚ 
          3 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          2 ♟ ♟ ♟ ⬚ ♟ ♟ ♟ ♟ 
          1 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
            a b c d e f g h 
          "
        `)

        const moveToNotAuthorizedPosition = () => game.executeMove(new Position('d4'), new Position('d5'))
        expect(moveToNotAuthorizedPosition).toThrowError('Illegal move')
      })

      it('should not move to 2 case forward, when a piece is front of', ({ expect }) => {
        const game = createGame()
        game.executeMove(new Position('d2'), new Position('d4'))
        game.executeMove(new Position('a7'), new Position('a6'))
        game.executeMove(new Position('d4'), new Position('d5'))

        // initiale state
        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7 ⬚ ♙ ♙ ♙ ♙ ♙ ♙ ♙ 
          6 ♙ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          5 ⬚ ⬚ ⬚ ♟ ⬚ ⬚ ⬚ ⬚ 
          4 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          3 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          2 ♟ ♟ ♟ ⬚ ♟ ♟ ♟ ♟ 
          1 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
            a b c d e f g h 
          "
        `)

        const moveToNotAuthorizedPosition = () => game.executeMove(new Position('d7'), new Position('d5'))
        expect(moveToNotAuthorizedPosition).toThrowError('Illegal move')
      })
    })

    describe('backforward moves', () => {
      it('should not move to backforward', ({ expect }) => {
        const game = createGame()
        game.executeMove(new Position('d2'), new Position('d3'))
        game.executeMove(new Position('d7'), new Position('d6'))

        // try to move backforward
        const moveToNotAuthorizedPosition = () => game.executeMove(new Position('d3'), new Position('d2'))
        expect(moveToNotAuthorizedPosition).toThrowError('Illegal move')
      })
    })

    describe('diagonal moves', () => {
      it('should move to diagonal case when an enemy piece is present', ({ expect }) => {
        const game = createGame()
        game.executeMove(new Position('b2'), new Position('b4'))
        game.executeMove(new Position('g7'), new Position('g5'))
        game.executeMove(new Position('b4'), new Position('b5'))
        game.executeMove(new Position('g5'), new Position('g4'))
        game.executeMove(new Position('b5'), new Position('b6'))
        game.executeMove(new Position('g4'), new Position('g3'))

        // initial position
        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7 ♙ ♙ ♙ ♙ ♙ ♙ ⬚ ♙ 
          6 ⬚ ♟ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          5 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          4 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          3 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ♙ ⬚ 
          2 ♟ ⬚ ♟ ♟ ♟ ♟ ♟ ♟ 
          1 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
            a b c d e f g h 
          "
        `)

        // move white to diagonal right
        game.executeMove(new Position('f2'), new Position('g3'))
        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7 ♙ ♙ ♙ ♙ ♙ ♙ ⬚ ♙ 
          6 ⬚ ♟ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          5 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          4 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          3 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ♟ ⬚ 
          2 ♟ ⬚ ♟ ♟ ♟ ⬚ ♟ ♟ 
          1 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
            a b c d e f g h 
          "
        `)

        // move black to diagonal left
        game.executeMove(new Position('a7'), new Position('b6'))
        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7 ⬚ ♙ ♙ ♙ ♙ ♙ ⬚ ♙ 
          6 ⬚ ♙ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          5 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          4 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          3 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ♟ ⬚ 
          2 ♟ ⬚ ♟ ♟ ♟ ⬚ ♟ ♟ 
          1 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
            a b c d e f g h 
          "
        `)
      })

      it('should not move to diagonal case when no enemy piece is present', ({ expect }) => {
        const game = createGame()

        const moveToNotAuthorizedPosition = () => game.executeMove(new Position('a2'), new Position('b3'))
        expect(moveToNotAuthorizedPosition).toThrowError('Illegal move')
      })
    })

    describe('"en passant" move', () => {
      it('should do "en passant" move', ({ expect }) => {
        const game = createGame()
        game.executeMove(new Position('d2'), new Position('d4'))
        game.executeMove(new Position('a7'), new Position('a6'))
        game.executeMove(new Position('d4'), new Position('d5'))
        game.executeMove(new Position('c7'), new Position('c5'))

        // initial position
        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7 ⬚ ♙ ⬚ ♙ ♙ ♙ ♙ ♙ 
          6 ♙ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          5 ⬚ ⬚ ♙ ♟ ⬚ ⬚ ⬚ ⬚ 
          4 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          3 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          2 ♟ ♟ ♟ ⬚ ♟ ♟ ♟ ♟ 
          1 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
            a b c d e f g h 
          "
        `)

        // move white pawn to "en passant" position
        game.executeMove(new Position('d5'), new Position('c6'))
        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7 ⬚ ♙ ⬚ ♙ ♙ ♙ ♙ ♙ 
          6 ♙ ⬚ ♟ ⬚ ⬚ ⬚ ⬚ ⬚ 
          5 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          4 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          3 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          2 ♟ ♟ ♟ ⬚ ♟ ♟ ♟ ♟ 
          1 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
            a b c d e f g h 
          "
        `)
      })

      it('should not do "en passant" move when the enemy Pawn already moved (2 move for c5)', ({ expect }) => {
        const game = createGame()
        game.executeMove(new Position('d2'), new Position('d4'))
        game.executeMove(new Position('c7'), new Position('c6'))
        game.executeMove(new Position('d4'), new Position('d5'))
        game.executeMove(new Position('c6'), new Position('c5'))

        // initial position
        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7 ♙ ♙ ⬚ ♙ ♙ ♙ ♙ ♙ 
          6 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          5 ⬚ ⬚ ♙ ♟ ⬚ ⬚ ⬚ ⬚ 
          4 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          3 ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ ⬚ 
          2 ♟ ♟ ♟ ⬚ ♟ ♟ ♟ ♟ 
          1 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
            a b c d e f g h 
          "
        `)

        const moveToNotAuthorizedPosition = () => game.executeMove(new Position('d5'), new Position('c6'))
        expect(moveToNotAuthorizedPosition).toThrowError('Illegal move')
      })
    })
  })
})
