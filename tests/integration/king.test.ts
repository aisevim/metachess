import { PieceMock } from 'tests/mocks/PieceMock'
import { renderGrid } from 'tests/utils'
import { setPiecesAtPositions } from 'tests/utils/board'
import { describe, it } from 'vitest'
import { AttackMapFactory } from '@/engine/attack/AttackMapFactory'
import { AttackMapManager } from '@/engine/attack/AttackMapManager'
import { Board } from '@/engine/board/Board'
import { Position } from '@/engine/board/Position'
import { RulesEngine } from '@/engine/game/RulesEngine'
import { King } from '@/engine/pieces/types/King'
import { Rook } from '@/engine/pieces/types/Rook'
import { Color } from '@/engine/types/enums/color'

describe('king legal moves (• moves, x capture)', () => {
  it('allows one-square in any direction, with captures and blocked by allies', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, King, Color.White, ['d4'])
    setPiecesAtPositions(board, PieceMock, Color.White, ['c5'])
    setPiecesAtPositions(board, PieceMock, Color.Black, ['d3'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('d4'))!
    const moves = rules.getLegalMoves(selected)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - ◉ - - - - -      - - ◉ • • - - - 
      4  - - - ♚ - - - -      - - • ♚ • - - - 
      3  - - - ☉ - - - -      - - • x • - - - 
      2  - - - - - - - -      - - - - - - - - 
      1  - - - - - - - -      - - - - - - - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(7)
  })

  it('allows only 3 moves when placed in the corner', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, King, Color.White, ['a1'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('a1'))!
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

  it('allow castling when path is clear and king is safe', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, King, Color.White, ['e1'])
    setPiecesAtPositions(board, Rook, Color.White, ['a1', 'h1'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('e1'))!
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

  it('forbids castling when path is blocked by pieces', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, King, Color.White, ['e1'])
    setPiecesAtPositions(board, Rook, Color.White, ['a1', 'h1'])
    setPiecesAtPositions(board, PieceMock, Color.White, ['g1'])
    setPiecesAtPositions(board, PieceMock, Color.Black, ['b1'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('e1'))!
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

  it('forbids castling when a path square is under attack', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, King, Color.White, ['e1'])
    setPiecesAtPositions(board, Rook, Color.White, ['a1', 'h1'])
    setPiecesAtPositions(board, PieceMock, Color.Black, ['c2', 'g2'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('e1'))!
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

  it('forbids castling while in check', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, King, Color.White, ['e1'])
    setPiecesAtPositions(board, Rook, Color.White, ['a1', 'h1'])
    setPiecesAtPositions(board, Rook, Color.Black, ['e3'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('e1'))!
    const moves = rules.getLegalMoves(selected)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - - - - - - -      - - - - - - - - 
      4  - - - - - - - -      - - - - - - - - 
      3  - - - - ♖ - - -      - - - - ♖ - - - 
      2  - - - - - - - -      - - - • - • - - 
      1  ♜ - - - ♚ - - ♜      ♜ - - • ♚ • - ♜ 
         A B C D E F G H      A B C D E F G H 
      "
    `)
  })

  it('restricts moves to block check when king is attacked', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, King, Color.White, ['e1'])
    setPiecesAtPositions(board, Rook, Color.White, ['a1', 'h3'])
    setPiecesAtPositions(board, Rook, Color.Black, ['e5'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('h3'))!
    const moves = rules.getLegalMoves(selected)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - - - ♖ - - -      - - - - ♖ - - - 
      4  - - - - - - - -      - - - - - - - - 
      3  - - - - - - - ♜      - - - - • - - ♜ 
      2  - - - - - - - -      - - - - - - - - 
      1  ♜ - - - ♚ - - -      ♜ - - - ♚ - - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(1)
  })

  it('skips moves that would move king into capture', ({ expect }) => {
    const board = new Board()
    const attackMap = new AttackMapManager(board, new AttackMapFactory())
    const rules = new RulesEngine(board, attackMap)

    setPiecesAtPositions(board, King, Color.White, ['e1'])
    setPiecesAtPositions(board, Rook, Color.Black, ['d2'])

    attackMap.recomputeAll()

    const selected = board.getPieceAt(new Position('e1'))!
    const moves = rules.getLegalMoves(selected)

    expect(renderGrid(board.toSnapshot(), moves)).toMatchInlineSnapshot(`
      "
      8  - - - - - - - -      - - - - - - - - 
      7  - - - - - - - -      - - - - - - - - 
      6  - - - - - - - -      - - - - - - - - 
      5  - - - - - - - -      - - - - - - - - 
      4  - - - - - - - -      - - - - - - - - 
      3  - - - - - - - -      - - - - - - - - 
      2  - - - ♖ - - - -      - - - x - - - - 
      1  - - - - ♚ - - -      - - - - ♚ • - - 
         A B C D E F G H      A B C D E F G H 
      "
    `)
    expect(moves).toHaveLength(2)
  })
})
