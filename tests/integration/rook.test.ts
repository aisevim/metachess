import type { Piece } from '@/pieces/Piece'
import { renderGrid } from 'tests/utils'
import { setPiecesAtPositions } from 'tests/utils/board'
import { describe, it } from 'vitest'
import { AttackMapFactory } from '@/attack/AttackMapFactory'
import { AttackMapManager } from '@/attack/AttackMapManager'
import { Board } from '@/board/Board'
import { Position } from '@/board/Position'
import { RulesEngine } from '@/game/RulesEngine'
import { Rook } from '@/pieces/types/Rook'
import { Color } from '@/types/enums/color'

describe('rook legal moves (• moves, x capture)', () => {
  it('moves along ranks and files with captures, blocked by allies, and respects board edges', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, Rook, Color.White, ['d4', 'g4'])
    setPiecesAtPositions(board, Rook, Color.Black, ['d7', 'a4', 'h4', 'd8'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('d4')) as Piece
    const moves = rules.getLegalMoves(selected)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - ♖ - - - -      - - - ♖ - - - - 
      7  - - - ♖ - - - -      - - - x - - - - 
      6  - - - - - - - -      - - - • - - - - 
      5  - - - - - - - -      - - - • - - - - 
      4  ♖ - - ♜ - - ♜ ♖      x • • ♜ • • ♜ ♖ 
      3  - - - - - - - -      - - - • - - - - 
      2  - - - - - - - -      - - - • - - - - 
      1  - - - - - - - -      - - - • - - - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(11)
  })
})
