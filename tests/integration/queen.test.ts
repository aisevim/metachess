import type { Piece } from '@/pieces/Piece'
import { PieceMock } from 'tests/mocks/PieceMock'
import { renderGrid } from 'tests/utils'
import { setPiecesAtPositions } from 'tests/utils/board'
import { describe, it } from 'vitest'
import { AttackMapFactory } from '@/attack/AttackMapFactory'
import { AttackMapManager } from '@/attack/AttackMapManager'
import { Board } from '@/board/Board'
import { Position } from '@/board/Position'
import { RulesEngine } from '@/game/RulesEngine'
import { Queen } from '@/pieces/types/Queen'
import { Color } from '@/types/enums/color'

describe('queen legal moves (• moves, x capture)', () => {
  it('moves along ranks and files with captures, blocked by allies, and respects board edges', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, Queen, Color.White, ['d4'])
    setPiecesAtPositions(board, PieceMock, Color.White, ['d5'])
    setPiecesAtPositions(board, PieceMock, Color.Black, ['d7', 'a4', 'f6', 'g7'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('d4')) as Piece
    const moves = rules.getLegalMoves(selected)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - ☉ - - ☉ -      • - - ☉ - - ☉ - 
      6  - - - - - ☉ - -      - • - - - x - - 
      5  - - - ◉ - - - -      - - • ◉ • - - - 
      4  ☉ - - ♛ - - - -      x • • ♛ • • • • 
      3  - - - - - - - -      - - • • • - - - 
      2  - - - - - - - -      - • - • - • - - 
      1  - - - - - - - -      • - - • - - • - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(21)
  })
})
