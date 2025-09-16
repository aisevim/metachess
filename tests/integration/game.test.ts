import { createGame, executeMoves, renderGrid } from 'tests/utils'
import { describe, it } from 'vitest'
import { Position } from '@/core/Position'

describe('integration', () => {
  it('should initialize game with Pieces at good position', ({ expect }) => {
    const game = createGame()

    expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
      "
      8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
      7  ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙ 
      6  - - - - - - - - 
      5  - - - - - - - - 
      4  - - - - - - - - 
      3  - - - - - - - - 
      2  ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟ 
      1  ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
         A B C D E F G H 
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
          8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7  ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙ 
          6  - - - - - - - - 
          5  - - - - - - - - 
          4  - - - - - - - - 
          3  - - - ♟ - - - - 
          2  ♟ ♟ ♟ - ♟ ♟ ♟ ♟ 
          1  ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
             A B C D E F G H 
          "
        `)
      })

      it('should move to 2 case forward', ({ expect }) => {
        const game = createGame()
        game.executeMove(new Position('d2'), new Position('d4'))

        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7  ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙ 
          6  - - - - - - - - 
          5  - - - - - - - - 
          4  - - - ♟ - - - - 
          3  - - - - - - - - 
          2  ♟ ♟ ♟ - ♟ ♟ ♟ ♟ 
          1  ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
             A B C D E F G H 
          "
        `)
      })
    })

    describe('diagonal moves', () => {
      it('should move to diagonal case when an enemy piece is present', ({ expect }) => {
        const game = createGame()
        executeMoves(game, [
          ['b2', 'b4'],
          ['g7', 'g5'],
          ['b4', 'b5'],
          ['g5', 'g4'],
          ['b5', 'b6'],
          ['g4', 'g3'],
        ])

        // initial position
        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7  ♙ ♙ ♙ ♙ ♙ ♙ - ♙ 
          6  - ♟ - - - - - - 
          5  - - - - - - - - 
          4  - - - - - - - - 
          3  - - - - - - ♙ - 
          2  ♟ - ♟ ♟ ♟ ♟ ♟ ♟ 
          1  ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
             A B C D E F G H 
          "
        `)

        // move white to diagonal right
        game.executeMove(new Position('f2'), new Position('g3'))
        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7  ♙ ♙ ♙ ♙ ♙ ♙ - ♙ 
          6  - ♟ - - - - - - 
          5  - - - - - - - - 
          4  - - - - - - - - 
          3  - - - - - - ♟ - 
          2  ♟ - ♟ ♟ ♟ - ♟ ♟ 
          1  ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
             A B C D E F G H 
          "
        `)

        // move black to diagonal left
        game.executeMove(new Position('a7'), new Position('b6'))
        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7  - ♙ ♙ ♙ ♙ ♙ - ♙ 
          6  - ♙ - - - - - - 
          5  - - - - - - - - 
          4  - - - - - - - - 
          3  - - - - - - ♟ - 
          2  ♟ - ♟ ♟ ♟ - ♟ ♟ 
          1  ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
             A B C D E F G H 
          "
        `)
      })
    })

    describe('"en passant" move', () => {
      it('should do "en passant" move', ({ expect }) => {
        const game = createGame()
        executeMoves(game, [
          ['d2', 'd4'],
          ['a7', 'a6'],
          ['d4', 'd5'],
          ['c7', 'c5'],
        ])

        // initial position
        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7  - ♙ - ♙ ♙ ♙ ♙ ♙ 
          6  ♙ - - - - - - - 
          5  - - ♙ ♟ - - - - 
          4  - - - - - - - - 
          3  - - - - - - - - 
          2  ♟ ♟ ♟ - ♟ ♟ ♟ ♟ 
          1  ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
             A B C D E F G H 
          "
        `)

        // move white pawn to "en passant" position
        game.executeMove(new Position('d5'), new Position('c6'))
        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7  - ♙ - ♙ ♙ ♙ ♙ ♙ 
          6  ♙ - ♟ - - - - - 
          5  - - - - - - - - 
          4  - - - - - - - - 
          3  - - - - - - - - 
          2  ♟ ♟ ♟ - ♟ ♟ ♟ ♟ 
          1  ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
             A B C D E F G H 
          "
        `)
      })

      it('should not do "en passant" move when the enemy Pawn already moved (2 move for c5)', ({ expect }) => {
        const game = createGame()
        executeMoves(game, [
          ['d2', 'd4'],
          ['c7', 'c6'],
          ['d4', 'd5'],
          ['c6', 'c5'],
        ])

        // initial position
        expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
          "
          8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
          7  ♙ ♙ - ♙ ♙ ♙ ♙ ♙ 
          6  - - - - - - - - 
          5  - - ♙ ♟ - - - - 
          4  - - - - - - - - 
          3  - - - - - - - - 
          2  ♟ ♟ ♟ - ♟ ♟ ♟ ♟ 
          1  ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
             A B C D E F G H 
          "
        `)

        const moveToNotAuthorizedPosition = () => game.executeMove(new Position('d5'), new Position('c6'))
        expect(moveToNotAuthorizedPosition).toThrowError('Illegal move')
      })
    })

    it('"en promotion" move', ({ expect }) => {
      const game = createGame()
      executeMoves(game, [
        ['d2', 'd4'],
        ['a7', 'a6'],
        ['d4', 'd5'],
        ['a6', 'a5'],
        ['d5', 'd6'],
        ['a5', 'a4'],
        ['d6', 'c7'],
        ['a4', 'a3'],
        ['c7', 'b8'],
      ])

      expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
        "
        8  ♖ ♛ ♗ ♕ ♔ ♗ ♘ ♖ 
        7  - ♙ - ♙ ♙ ♙ ♙ ♙ 
        6  - - - - - - - - 
        5  - - - - - - - - 
        4  - - - - - - - - 
        3  ♙ - - - - - - - 
        2  ♟ ♟ ♟ - ♟ ♟ ♟ ♟ 
        1  ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
           A B C D E F G H 
        "
      `)
    })
  })

  describe('bishop', () => {
    it('should move to diagonals and capture enemy pawn', ({ expect }) => {
      const game = createGame()
      executeMoves(game, [
        ['d2', 'd3'],
        ['g7', 'g5'],
      ])

      expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
        "
        8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
        7  ♙ ♙ ♙ ♙ ♙ ♙ - ♙ 
        6  - - - - - - - - 
        5  - - - - - - ♙ - 
        4  - - - - - - - - 
        3  - - - ♟ - - - - 
        2  ♟ ♟ ♟ - ♟ ♟ ♟ ♟ 
        1  ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
           A B C D E F G H 
        "
      `)

      // Bishop take g5 on diagonal
      game.executeMove(new Position('c1'), new Position('g5'))
      expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
        "
        8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
        7  ♙ ♙ ♙ ♙ ♙ ♙ - ♙ 
        6  - - - - - - - - 
        5  - - - - - - ♝ - 
        4  - - - - - - - - 
        3  - - - ♟ - - - - 
        2  ♟ ♟ ♟ - ♟ ♟ ♟ ♟ 
        1  ♜ ♞ - ♛ ♚ ♝ ♞ ♜ 
           A B C D E F G H 
        "
      `)
    })
  })

  describe('rook', () => {
    it('should move to veritcal and capture enemy pawn', ({ expect }) => {
      const game = createGame()
      executeMoves(game, [
        ['a2', 'a4'],
        ['a7', 'a6'],
        ['a1', 'a3'],
        ['a6', 'a5'],
        ['a3', 'b3'],
        ['h7', 'h6'],
      ])

      // init position
      expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
        "
        8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
        7  - ♙ ♙ ♙ ♙ ♙ ♙ - 
        6  - - - - - - - ♙ 
        5  ♙ - - - - - - - 
        4  ♟ - - - - - - - 
        3  - ♜ - - - - - - 
        2  - ♟ ♟ ♟ ♟ ♟ ♟ ♟ 
        1  - ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
           A B C D E F G H 
        "
      `)

      game.executeMove(new Position('b3'), new Position('b7'))
      expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
        "
        8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
        7  - ♜ ♙ ♙ ♙ ♙ ♙ - 
        6  - - - - - - - ♙ 
        5  ♙ - - - - - - - 
        4  ♟ - - - - - - - 
        3  - - - - - - - - 
        2  - ♟ ♟ ♟ ♟ ♟ ♟ ♟ 
        1  - ♞ ♝ ♛ ♚ ♝ ♞ ♜ 
           A B C D E F G H 
        "
      `)
    })
  })

  describe('queen', () => {
    it('should move to veritcal or diagonal and capture enemy pawn', ({ expect }) => {
      const game = createGame()
      executeMoves(game, [
        ['d2', 'd4'],
        ['a7', 'a6'],
        ['d1', 'd2'],
        ['a6', 'a5'],
        ['d2', 'c3'],
        ['a5', 'a4'],
      ])

      // init position
      expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
        "
        8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
        7  - ♙ ♙ ♙ ♙ ♙ ♙ ♙ 
        6  - - - - - - - - 
        5  - - - - - - - - 
        4  ♙ - - ♟ - - - - 
        3  - - ♛ - - - - - 
        2  ♟ ♟ ♟ - ♟ ♟ ♟ ♟ 
        1  ♜ ♞ ♝ - ♚ ♝ ♞ ♜ 
           A B C D E F G H 
        "
      `)

      game.executeMove(new Position('c3'), new Position('c7'))
      expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
        "
        8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
        7  - ♙ ♛ ♙ ♙ ♙ ♙ ♙ 
        6  - - - - - - - - 
        5  - - - - - - - - 
        4  ♙ - - ♟ - - - - 
        3  - - - - - - - - 
        2  ♟ ♟ ♟ - ♟ ♟ ♟ ♟ 
        1  ♜ ♞ ♝ - ♚ ♝ ♞ ♜ 
           A B C D E F G H 
        "
      `)
    })
  })

  describe('knight', () => {
    it('should move to specific position of Knight and capture enemy pawn', ({ expect }) => {
      const game = createGame()
      executeMoves(game, [
        ['b1', 'c3'],
        ['d7', 'd5'],
      ])

      // init position
      expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
        "
        8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
        7  ♙ ♙ ♙ - ♙ ♙ ♙ ♙ 
        6  - - - - - - - - 
        5  - - - ♙ - - - - 
        4  - - - - - - - - 
        3  - - ♞ - - - - - 
        2  ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟ 
        1  ♜ - ♝ ♛ ♚ ♝ ♞ ♜ 
           A B C D E F G H 
        "
      `)

      game.executeMove(new Position('c3'), new Position('d5'))
      expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
        "
        8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
        7  ♙ ♙ ♙ - ♙ ♙ ♙ ♙ 
        6  - - - - - - - - 
        5  - - - ♞ - - - - 
        4  - - - - - - - - 
        3  - - - - - - - - 
        2  ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟ 
        1  ♜ - ♝ ♛ ♚ ♝ ♞ ♜ 
           A B C D E F G H 
        "
      `)
    })
  })

  describe('king', () => {
    it('should move to specific position of King and capture enemy pawn', ({ expect }) => {
      const game = createGame()
      executeMoves(game, [
        ['e2', 'e4'],
        ['d7', 'd5'],
        ['e1', 'e2'],
        ['d5', 'd4'],
        ['e2', 'd3'],
        ['a7', 'a6'],
      ])

      // init position
      expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
        "
        8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
        7  - ♙ ♙ - ♙ ♙ ♙ ♙ 
        6  ♙ - - - - - - - 
        5  - - - - - - - - 
        4  - - - ♙ ♟ - - - 
        3  - - - ♚ - - - - 
        2  ♟ ♟ ♟ ♟ - ♟ ♟ ♟ 
        1  ♜ ♞ ♝ ♛ - ♝ ♞ ♜ 
           A B C D E F G H 
        "
      `)

      game.executeMove(new Position('d3'), new Position('d4'))
      expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
        "
        8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
        7  - ♙ ♙ - ♙ ♙ ♙ ♙ 
        6  ♙ - - - - - - - 
        5  - - - - - - - - 
        4  - - - ♚ ♟ - - - 
        3  - - - - - - - - 
        2  ♟ ♟ ♟ ♟ - ♟ ♟ ♟ 
        1  ♜ ♞ ♝ ♛ - ♝ ♞ ♜ 
           A B C D E F G H 
        "
      `)
    })

    it('should do castle move at king side', ({ expect }) => {
      const game = createGame()
      executeMoves(game, [
        ['e2', 'e4'],
        ['d7', 'd5'],
        ['f1', 'd3'],
        ['d5', 'd4'],
        ['g1', 'h3'],
        ['a7', 'a6'],
      ])

      // init position
      expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
        "
        8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
        7  - ♙ ♙ - ♙ ♙ ♙ ♙ 
        6  ♙ - - - - - - - 
        5  - - - - - - - - 
        4  - - - ♙ ♟ - - - 
        3  - - - ♝ - - - ♞ 
        2  ♟ ♟ ♟ ♟ - ♟ ♟ ♟ 
        1  ♜ ♞ ♝ ♛ ♚ - - ♜ 
           A B C D E F G H 
        "
      `)

      executeMoves(game, [['e1', 'g1']])
      expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
        "
        8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
        7  - ♙ ♙ - ♙ ♙ ♙ ♙ 
        6  ♙ - - - - - - - 
        5  - - - - - - - - 
        4  - - - ♙ ♟ - - - 
        3  - - - ♝ - - - ♞ 
        2  ♟ ♟ ♟ ♟ - ♟ ♟ ♟ 
        1  ♜ ♞ ♝ ♛ - ♜ ♚ - 
           A B C D E F G H 
        "
      `)
    })

    it('should do castle move at queen side', ({ expect }) => {
      const game = createGame()
      executeMoves(game, [
        ['d2', 'd4'],
        ['d7', 'd5'],
        ['c1', 'e3'],
        ['a7', 'a6'],
        ['b1', 'a3'],
        ['a6', 'a5'],
        ['d1', 'd2'],
        ['a5', 'a4'],
      ])

      // init position
      expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
        "
        8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
        7  - ♙ ♙ - ♙ ♙ ♙ ♙ 
        6  - - - - - - - - 
        5  - - - ♙ - - - - 
        4  ♙ - - ♟ - - - - 
        3  ♞ - - - ♝ - - - 
        2  ♟ ♟ ♟ ♛ ♟ ♟ ♟ ♟ 
        1  ♜ - - - ♚ ♝ ♞ ♜ 
           A B C D E F G H 
        "
      `)

      executeMoves(game, [['e1', 'c1']])
      expect(renderGrid(game.getBoardSnapshot())).toMatchInlineSnapshot(`
        "
        8  ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖ 
        7  - ♙ ♙ - ♙ ♙ ♙ ♙ 
        6  - - - - - - - - 
        5  - - - ♙ - - - - 
        4  ♙ - - ♟ - - - - 
        3  ♞ - - - ♝ - - - 
        2  ♟ ♟ ♟ ♛ ♟ ♟ ♟ ♟ 
        1  - - ♚ ♜ - ♝ ♞ ♜ 
           A B C D E F G H 
        "
      `)
    })
  })
})
