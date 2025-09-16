import { PieceMock } from 'tests/mocks/PieceMock'
import { renderGrid } from 'tests/utils'
import { setPiecesAtPositions } from 'tests/utils/board'
import { describe, it } from 'vitest'
import { Board } from '@/core/Board'
import { Position } from '@/core/Position'
import { Knight } from '@/pieces/Knight'

describe('knight legal moves (• moves, x capture)', () => {
  it('shows 7 legal moves (L-shaped) from d4 (1 blocked, 2 captures, 5 free)', ({ expect }) => {
    const board = new Board()
    setPiecesAtPositions(board, Knight, 'white', ['d4', 'c6'])
    setPiecesAtPositions(board, PieceMock, 'black', ['b3', 'f5'])
    const selected = board.getPieceAt(new Position('d4'))
    const moves = selected?.getLegalMoves(board)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - ♞ - - - - -      - - ♞ - • - - - 
      5  - - - - - ☉ - -      - • - - - x - - 
      4  - - - ♞ - - - -      - - - ♞ - - - - 
      3  - ☉ - - - - - -      - x - - - • - - 
      2  - - - - - - - -      - - • - • - - - 
      1  - - - - - - - -      - - - - - - - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(7)
  })

  it('shows 2 legal moves from the corner a1', ({ expect }) => {
    const board = new Board()
    setPiecesAtPositions(board, Knight, 'white', ['a1'])
    const selected = board.getPieceAt(new Position('a1'))
    const moves = selected?.getLegalMoves(board)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - - - - - - -      - - - - - - - - 
      4  - - - - - - - -      - - - - - - - - 
      3  - - - - - - - -      - • - - - - - - 
      2  - - - - - - - -      - - • - - - - - 
      1  ♞ - - - - - - -      ♞ - - - - - - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(2)
  })
})
