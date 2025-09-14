import { renderGrid } from 'tests/utils'
import { setPiecesAtPositions } from 'tests/utils/board'
import { describe, it } from 'vitest'
import { Board } from '@/core/Board'
import { Position } from '@/core/Position'
import { Queen } from '@/pieces/Queen'

describe('queen legal moves (• moves, x capture)', () => {
  it('moves along ranks and files with captures, blocked by allies, and respects board edges', ({ expect }) => {
    const board = new Board()
    setPiecesAtPositions(board, Queen, 'white', ['d4', 'd5'])
    setPiecesAtPositions(board, Queen, 'black', ['d7', 'a4', 'f6', 'g7'])
    const selected = board.getPieceAt(new Position('d4'))
    const moves = selected?.getLegalMoves(board)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - ♕ - - ♕ -      • - - ♕ - - ♕ - 
      6  - - - - - ♕ - -      - • - - - x - - 
      5  - - - ♛ - - - -      - - • ♛ • - - - 
      4  ♕ - - ♛ - - - -      x • • ♛ • • • • 
      3  - - - - - - - -      - - • • • - - - 
      2  - - - - - - - -      - • - • - • - - 
      1  - - - - - - - -      • - - • - - • - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(21)
  })
})
