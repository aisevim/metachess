import { renderGrid } from 'tests/utils'
import { setPiecesAtPositions } from 'tests/utils/board'
import { describe, it } from 'vitest'
import { Board } from '@/core/Board'
import { Position } from '@/core/Position'
import { King } from '@/pieces/King'

describe('king legal moves (• moves, x capture)', () => {
  it('one-square in any direction, with captures and blocked by allies', ({ expect }) => {
    const board = new Board()
    setPiecesAtPositions(board, King, 'white', ['d4', 'c5'])
    setPiecesAtPositions(board, King, 'black', ['c3', 'd3'])
    const selected = board.getPieceAt(new Position('d4'))
    const moves = selected?.getLegalMoves(board)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - ♚ - - - - -      - - ♚ • • - - - 
      4  - - - ♚ - - - -      - - • ♚ • - - - 
      3  - - ♔ ♔ - - - -      - - x x • - - - 
      2  - - - - - - - -      - - - - - - - - 
      1  - - - - - - - -      - - - - - - - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(7)
  })

  it('shows only moves within the board from the corner a1', ({ expect }) => {
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
})
