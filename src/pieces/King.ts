import type { IBoard } from '@/types/interfaces/IBoard'
import type { LegalMoveContext } from '@/types/piece'
import { MoveCommand } from '@/core/MoveCommand'
import { Position } from '@/core/Position'
import { SteppingPiece } from '@/pieces/SteppingPiece'

export class King extends SteppingPiece {
  readonly type = 'king'
  protected readonly OFFSETS = [
    { dx: 1, dy: 0 },
    { dx: 1, dy: 1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: -1 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: -1 },
  ]

  getLegalMoves(board: IBoard, context?: LegalMoveContext): MoveCommand[] {
    const moves = super.getLegalMoves(board)
    const { onCastling } = context ?? {}

    if (!this.hasMoved && !onCastling) {
      moves.push(...this.getCastlingMoves(board))
    }

    return moves
  }

  private getCastlingMoves(board: IBoard): MoveCommand[] {
    const moves: MoveCommand[] = []
    const row = this.position.y
    const enemyColor = this.color === 'white' ? 'black' : 'white'

    const castlePositionsConfig = [
      { rookX: 7, kingTargetX: 6, rookTargetX: 5, emptyXs: [5, 6] },
      { rookX: 0, kingTargetX: 2, rookTargetX: 3, emptyXs: [1, 2, 3] },
    ]

    for (const config of castlePositionsConfig) {
      const rook = board.getPieceAt(new Position(config.rookX, row))
      const kingSlideSquares = [this.position.x, ...config.emptyXs]

      const isRookHasMoved = !rook || rook.type !== 'rook' || rook.hasMoved
      const hasEmptySquaresOnPath = config.emptyXs.some(x => board.getPieceAt(new Position(x, row)) !== null)
      const isTheSquaresAttackedByEnemy = kingSlideSquares.some(x => board.isSquareAttackedByEnemy(new Position(x, row), enemyColor))

      if (isRookHasMoved || hasEmptySquaresOnPath || isTheSquaresAttackedByEnemy)
        continue

      moves.push(new MoveCommand(this, this.position, new Position(config.kingTargetX, row), 'castling', {
        castle: { rookPiece: rook, rookNewPosition: new Position(config.rookTargetX, row) },
      }))
    }

    return moves
  }
}
