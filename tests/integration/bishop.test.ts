import { PieceMock } from 'tests/mocks/PieceMock'
import { renderGrid } from 'tests/utils'
import { setPiecesAtPositions } from 'tests/utils/board'
import { describe, it } from 'vitest'
import { Board } from '@/core/Board'
import { Position } from '@/core/Position'
import { Bishop } from '@/pieces/Bishop'

describe('bishop legal moves (• moves, x capture)', () => {
  it('moves along diagonals with captures, respecting board edges', ({ expect }) => {
    const board = new Board()
    setPiecesAtPositions(board, Bishop, 'white', ['d4', 'b6'])
    setPiecesAtPositions(board, PieceMock, 'black', ['f2', 'b2', 'a7', 'a1'])
    const selected = board.getPieceAt(new Position('d4'))
    const moves = selected?.getLegalMoves(board)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - • 
      7  ☉ - - - - - - -      ☉ - - - - - • - 
      6  - ♝ - - - - - -      - ♝ - - - • - - 
      5  - - - - - - - -      - - • - • - - - 
      4  - - - ♝ - - - -      - - - ♝ - - - - 
      3  - - - - - - - -      - - • - • - - - 
      2  - ☉ - - - ☉ - -      - x - - - x - - 
      1  ☉ - - - - - - -      ☉ - - - - - - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(9)
  })
})
