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
import { Bishop } from '@/engine/pieces/types/Bishop'
import { Color } from '@/engine/types/enums/color'

describe('bishop legal moves (• moves, x capture)', () => {
  it('moves along diagonals with captures, respecting board edges', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, Bishop, Color.White, ['d4', 'b6'])
    setPiecesAtPositions(board, PieceMock, Color.Black, ['f2', 'b2', 'a7', 'a1'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('d4')) as Piece
    const moves = rules.getLegalMoves(selected)

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
