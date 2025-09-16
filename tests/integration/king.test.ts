import { PieceMock } from 'tests/mocks/PieceMock'
import { renderGrid } from 'tests/utils'
import { setPiecesAtPositions } from 'tests/utils/board'
import { describe, it } from 'vitest'
import { Board } from '@/core/Board'
import { Position } from '@/core/Position'
import { King } from '@/pieces/King'
import { Rook } from '@/pieces/Rook'

describe('king legal moves (• moves, x capture)', () => {
  it('one-square in any direction, with captures and blocked by allies', ({ expect }) => {
    const board = new Board()
    setPiecesAtPositions(board, King, 'white', ['d4'])
    setPiecesAtPositions(board, PieceMock, 'white', ['c5'])
    setPiecesAtPositions(board, PieceMock, 'black', ['c3', 'd3'])
    const selected = board.getPieceAt(new Position('d4'))
    const moves = selected?.getLegalMoves(board)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - ◉ - - - - -      - - ◉ • • - - - 
      4  - - - ♚ - - - -      - - • ♚ • - - - 
      3  - - ☉ ☉ - - - -      - - x x • - - - 
      2  - - - - - - - -      - - - - - - - - 
      1  - - - - - - - -      - - - - - - - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(7)
  })

  it('should only allow 3 moves when in the corner', ({ expect }) => {
    const board = new Board()
    setPiecesAtPositions(board, King, 'white', ['a1'])
    const selected = board.getPieceAt(new Position('a1'))
    const moves = selected?.getLegalMoves(board)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - - - - - - -      - - - - - - - - 
      4  - - - - - - - -      - - - - - - - - 
      3  - - - - - - - -      - - - - - - - - 
      2  - - - - - - - -      • • - - - - - - 
      1  ♚ - - - - - - -      ♚ • - - - - - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(3)
  })

  it('should allow castling when path is clear and king is safe', ({ expect }) => {
    const board = new Board()
    setPiecesAtPositions(board, King, 'white', ['e1'])
    setPiecesAtPositions(board, Rook, 'white', ['a1', 'h1'])
    const selected = board.getPieceAt(new Position('e1'))
    const moves = selected?.getLegalMoves(board)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
        "
        8  - - - - - - - -      - - - - - - - - 
        7  - - - - - - - -      - - - - - - - - 
        6  - - - - - - - -      - - - - - - - - 
        5  - - - - - - - -      - - - - - - - - 
        4  - - - - - - - -      - - - - - - - - 
        3  - - - - - - - -      - - - - - - - - 
        2  - - - - - - - -      - - - • • • - - 
        1  ♜ - - - ♚ - - ♜      ♜ - • • ♚ • • ♜ 
           A B C D E F G H      A B C D E F G H 
        "
      `)
  })

  it('should not allow castling when allied or enemies pieces block the path', ({ expect }) => {
    const board = new Board()
    setPiecesAtPositions(board, King, 'white', ['e1'])
    setPiecesAtPositions(board, Rook, 'white', ['a1', 'h1'])
    setPiecesAtPositions(board, PieceMock, 'white', ['g1'])
    setPiecesAtPositions(board, PieceMock, 'black', ['b1'])
    const selected = board.getPieceAt(new Position('e1'))
    const moves = selected?.getLegalMoves(board)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - - - - - - -      - - - - - - - - 
      4  - - - - - - - -      - - - - - - - - 
      3  - - - - - - - -      - - - - - - - - 
      2  - - - - - - - -      - - - • • • - - 
      1  ♜ ☉ - - ♚ - ◉ ♜      ♜ ☉ - • ♚ • ◉ ♜ 
         A B C D E F G H      A B C D E F G H 
      "
    `)
  })

  it('should not allow castling if a square in the path is under attack', ({ expect }) => {
    const board = new Board()
    setPiecesAtPositions(board, King, 'white', ['e1'])
    setPiecesAtPositions(board, Rook, 'white', ['a1', 'h1'])
    setPiecesAtPositions(board, PieceMock, 'black', ['c2', 'g2'])
    const selected = board.getPieceAt(new Position('e1'))
    const moves = selected?.getLegalMoves(board)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - - - - - - -      - - - - - - - - 
      4  - - - - - - - -      - - - - - - - - 
      3  - - - - - - - -      - - - - - - - - 
      2  - - ☉ - - - ☉ -      - - ☉ • • • ☉ - 
      1  ♜ - - - ♚ - - ♜      ♜ - - • ♚ • - ♜ 
         A B C D E F G H      A B C D E F G H 
      "
    `)
  })

  it('should not allow castling while in check', ({ expect }) => {
    const board = new Board()
    setPiecesAtPositions(board, King, 'white', ['e1'])
    setPiecesAtPositions(board, Rook, 'white', ['a1', 'h1'])
    setPiecesAtPositions(board, Rook, 'black', ['e2'])
    const selected = board.getPieceAt(new Position('e1'))
    const moves = selected?.getLegalMoves(board)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - - - - - - -      - - - - - - - - 
      4  - - - - - - - -      - - - - - - - - 
      3  - - - - - - - -      - - - - - - - - 
      2  - - - - ♖ - - -      - - - • x • - - 
      1  ♜ - - - ♚ - - ♜      ♜ - - • ♚ • - ♜ 
         A B C D E F G H      A B C D E F G H 
      "
    `)
  })
})
