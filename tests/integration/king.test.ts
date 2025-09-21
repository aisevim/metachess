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
import { King } from '@/pieces/types/King'
import { Rook } from '@/pieces/types/Rook'
import { Color } from '@/types/enums/color'

describe('king legal moves (• moves, x capture)', () => {
  it('one-square in any direction, with captures and blocked by allies', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, King, Color.White, ['d4'])
    setPiecesAtPositions(board, PieceMock, Color.White, ['c5'])
    setPiecesAtPositions(board, PieceMock, Color.Black, ['c3', 'd3'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('d4')) as Piece
    const moves = rules.getLegalMoves(selected)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - ◉ - - - - -      - - ◉ • • - - - 
      4  - - - ♚ - - - -      - - • ♚ • - - - 
      3  - - ☉ ☉ - - - -      - - x x • - - - 
      2  - - - - - - - -      - - - - - - - - 
      1  - - - - - - - -      - - - - - - - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(7)
  })

  it('should only allow 3 moves when in the corner', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, King, Color.White, ['a1'])

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
      3  - - - - - - - -      - - - - - - - - 
      2  - - - - - - - -      • • - - - - - - 
      1  ♚ - - - - - - -      ♚ • - - - - - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(3)
  })

  it('should allow castling when path is clear and king is safe', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, King, Color.White, ['e1'])
    setPiecesAtPositions(board, Rook, Color.White, ['a1', 'h1'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('e1')) as Piece
    const moves = rules.getLegalMoves(selected)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
        "
        8  - - - - - - - -      - - - - - - - - 
        7  - - - - - - - -      - - - - - - - - 
        6  - - - - - - - -      - - - - - - - - 
        5  - - - - - - - -      - - - - - - - - 
        4  - - - - - - - -      - - - - - - - - 
        3  - - - - - - - -      - - - - - - - - 
        2  - - - - - - - -      - - - • • • - - 
        1  ♜ - - - ♚ - - ♜      ♜ - • • ♚ • • ♜ 
           A B C D E F G H      A B C D E F G H 
        "
      `)
  })

  it('should not allow castling when allied or enemies pieces block the path', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, King, Color.White, ['e1'])
    setPiecesAtPositions(board, Rook, Color.White, ['a1', 'h1'])
    setPiecesAtPositions(board, PieceMock, Color.White, ['g1'])
    setPiecesAtPositions(board, PieceMock, Color.Black, ['b1'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('e1')) as Piece
    const moves = rules.getLegalMoves(selected)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - - - - - - -      - - - - - - - - 
      4  - - - - - - - -      - - - - - - - - 
      3  - - - - - - - -      - - - - - - - - 
      2  - - - - - - - -      - - - • • • - - 
      1  ♜ ☉ - - ♚ - ◉ ♜      ♜ ☉ - • ♚ • ◉ ♜ 
         A B C D E F G H      A B C D E F G H 
      "
    `)
  })

  it('should not allow castling if a square in the path is under attack', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, King, Color.White, ['e1'])
    setPiecesAtPositions(board, Rook, Color.White, ['a1', 'h1'])
    setPiecesAtPositions(board, PieceMock, Color.Black, ['c2', 'g2'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('e1')) as Piece
    const moves = rules.getLegalMoves(selected)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - - - - - - -      - - - - - - - - 
      4  - - - - - - - -      - - - - - - - - 
      3  - - - - - - - -      - - - - - - - - 
      2  - - ☉ - - - ☉ -      - - ☉ • • • ☉ - 
      1  ♜ - - - ♚ - - ♜      ♜ - - • ♚ • - ♜ 
         A B C D E F G H      A B C D E F G H 
      "
    `)
  })

  it('should not allow castling while in check', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, King, Color.White, ['e1'])
    setPiecesAtPositions(board, Rook, Color.White, ['a1', 'h1'])
    setPiecesAtPositions(board, Rook, Color.Black, ['e2'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('e1')) as Piece
    const moves = rules.getLegalMoves(selected)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - - - - - - -      - - - - - - - - 
      4  - - - - - - - -      - - - - - - - - 
      3  - - - - - - - -      - - - - - - - - 
      2  - - - - ♖ - - -      - - - • x • - - 
      1  ♜ - - - ♚ - - ♜      ♜ - - • ♚ • - ♜ 
         A B C D E F G H      A B C D E F G H 
      "
    `)
  })
})
