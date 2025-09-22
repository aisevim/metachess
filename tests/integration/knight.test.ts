import type { Piece } from '@/engine/pieces/Piece'
import { PieceMock } from 'tests/mocks/PieceMock'
import { renderGrid } from 'tests/utils'
import { setPiecesAtPositions } from 'tests/utils/board'
import { describe, it } from 'vitest'
import { AttackMapFactory } from '@/engine/attack/AttackMapFactory'
import { AttackMapManager } from '@/engine/attack/AttackMapManager'
import { Board } from '@/engine/board/Board'
import { Position } from '@/engine/board/Position'
import { RulesEngine } from '@/engine/game/RulesEngine'
import { Knight } from '@/engine/pieces/types/Knight'
import { Color } from '@/engine/types/enums/color'

describe('knight legal moves (• moves, x capture)', () => {
  it('shows 7 legal moves (L-shaped) from d4 (1 blocked, 2 captures, 5 free)', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, Knight, Color.White, ['d4', 'c6'])
    setPiecesAtPositions(board, PieceMock, Color.Black, ['b3', 'f5'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('d4')) as Piece
    const moves = rules.getLegalMoves(selected)

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
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, Knight, Color.White, ['a1'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('a1')) as Piece
    const moves = rules.getLegalMoves(selected)

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
