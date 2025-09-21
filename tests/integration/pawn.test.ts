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
import { NormalMoveExecutor } from '@/moves/execution/NormalMoveExecutor'
import { MoveCommand } from '@/moves/MoveCommand'
import { Pawn } from '@/pieces/types/Pawn'
import { Color } from '@/types/enums/color'

describe('pawn legal moves (• moves, x capture)', () => {
  it('moves 1 square forward if already moved, diagonals for capture', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, Pawn, Color.White, ['c2', 'd2'])
    setPiecesAtPositions(board, PieceMock, Color.Black, ['c3', 'e1'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('d2')) as Piece
    selected.hasMoved = true

    const moves = rules.getLegalMoves(selected)
    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - - - - - - -      - - - - - - - - 
      4  - - - - - - - -      - - - - - - - - 
      3  - - ☉ - - - - -      - - x • - - - - 
      2  - - ♟ ♟ - - - -      - - ♟ ♟ - - - - 
      1  - - - - ☉ - - -      - - - - ☉ - - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(2)
  })

  it('moves 1 or 2 squares forward if not moved, diagonals for capture', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, Pawn, Color.White, ['c2', 'd2'])
    setPiecesAtPositions(board, PieceMock, Color.Black, ['c3', 'e3', 'e1'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('d2')) as Piece
    const moves = rules.getLegalMoves(selected)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - - - - - - -      - - - - - - - - 
      4  - - - - - - - -      - - - • - - - - 
      3  - - ☉ - ☉ - - -      - - x • x - - - 
      2  - - ♟ ♟ - - - -      - - ♟ ♟ - - - - 
      1  - - - - ☉ - - -      - - - - ☉ - - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(4)
  })

  it('handles en passant correctly', ({ expect }) => {
    const history = [new MoveCommand(
      new Pawn(Color.White, new Position('d4')),
      new Position('d2'),
      new Position('d4'),
      new NormalMoveExecutor(),
    )]
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap, history)

    setPiecesAtPositions(board, Pawn, Color.White, ['c2', 'd4', 'f3'])
    setPiecesAtPositions(board, Pawn, Color.Black, ['e4'])

    const selected = board.getPieceAt(new Position('e4')) as Piece
    selected.hasMoved = true

    attackMap.recomputeAll()

    const moves = rules.getLegalMoves(selected)
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
