import { PieceMock } from 'tests/mocks/PieceMock'
import { renderGrid } from 'tests/utils'
import { setPiecesAtPositions } from 'tests/utils/board'
import { describe, it } from 'vitest'
import { AttackMapFactory } from '@/engine/attack/AttackMapFactory'
import { AttackMapManager } from '@/engine/attack/AttackMapManager'
import { Board } from '@/engine/board/Board'
import { Position } from '@/engine/board/Position'
import { RulesEngine } from '@/engine/game/RulesEngine'
import { Queen } from '@/engine/pieces/types/Queen'
import { Color } from '@/engine/types/enums/color'

describe('queen legal moves (• moves, x capture)', () => {
  it('moves along ranks and files with captures, blocked by allies, and respects board edges', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, Queen, Color.White, ['d4'])
    setPiecesAtPositions(board, PieceMock, Color.White, ['d5'])
    setPiecesAtPositions(board, PieceMock, Color.Black, ['d7', 'a4', 'f6', 'g7'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('d4'))!
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
