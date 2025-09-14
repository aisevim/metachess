import { renderGrid } from 'tests/utils'
import { setPiecesAtPositions } from 'tests/utils/board'
import { describe, it } from 'vitest'
import { Board } from '@/core/Board'
import { Move } from '@/core/Move'
import { Position } from '@/core/Position'
import { Pawn } from '@/pieces/Pawn'

describe('pawn legal moves (• moves, x capture)', () => {
  it('moves 1 square forward if already moved, diagonals for capture', ({ expect }) => {
    const board = new Board()
    setPiecesAtPositions(board, Pawn, 'white', ['c2', 'd2'])
    setPiecesAtPositions(board, Pawn, 'black', ['c3', 'e1'])
    const selected = board.getPieceAt(new Position('d2'))

    // Simulate the pawn already moved
    if (selected)
      selected.hasMoved = true

    const moves = selected?.getLegalMoves(board)
    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - - - - - - -      - - - - - - - - 
      4  - - - - - - - -      - - - - - - - - 
      3  - - ♙ - - - - -      - - x • - - - - 
      2  - - ♟ ♟ - - - -      - - ♟ ♟ - - - - 
      1  - - - - ♙ - - -      - - - - ♙ - - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(2)
  })

  it('moves 1 or 2 squares forward if not moved, diagonals for capture', ({ expect }) => {
    const board = new Board()
    setPiecesAtPositions(board, Pawn, 'white', ['c2', 'd2'])
    setPiecesAtPositions(board, Pawn, 'black', ['c3', 'e3', 'e1'])
    const selected = board.getPieceAt(new Position('d2'))
    const moves = selected?.getLegalMoves(board)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
          "
          8  - - - - - - - -      - - - - - - - - 
          7  - - - - - - - -      - - - - - - - - 
          6  - - - - - - - -      - - - - - - - - 
          5  - - - - - - - -      - - - - - - - - 
          4  - - - - - - - -      - - - • - - - - 
          3  - - ♙ - ♙ - - -      - - x • x - - - 
          2  - - ♟ ♟ - - - -      - - ♟ ♟ - - - - 
          1  - - - - ♙ - - -      - - - - ♙ - - - 
             A B C D E F G H      A B C D E F G H 
          "
        `)
    expect(moves).toHaveLength(4)
  })

  it('handles en passant correctly', ({ expect }) => {
    const context = {
      history: [new Move(
        new Pawn('white', new Position('d4')),
        new Position('d2'),
        new Position('d4'),
        {
          capturedPiece: new Pawn('black', new Position('d4')),
        },
      )],
    }
    const board = new Board()
    setPiecesAtPositions(board, Pawn, 'white', ['c2', 'd4', 'f3'])
    setPiecesAtPositions(board, Pawn, 'black', ['e4'])
    const selected = board.getPieceAt(new Position('e4'))

    // Simulate the pawn already moved
    if (selected)
      selected.hasMoved = true

    const moves = selected?.getLegalMoves(board, context)
    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - - - - - - -      - - - - - - - - 
      4  - - - ♟ ♙ - - -      - - - ♟ ♙ - - - 
      3  - - - - - ♟ - -      - - - • • x - - 
      2  - - ♟ - - - - -      - - ♟ - - - - - 
      1  - - - - - - - -      - - - - - - - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(3)
  })
})
