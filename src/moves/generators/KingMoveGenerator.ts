import type { Piece } from '@/pieces/Piece'
import { Position } from '@/board/Position'
import { CastleMoveExecutor } from '@/moves/execution/CastleMoveExecutor'
import { NormalMoveGenerator } from '@/moves/generators/NormalMoveGenerator'
import { MoveCommand } from '@/moves/MoveCommand'
import { PieceType } from '@/pieces/enums/PieceType'

export class KingMoveGenerator extends NormalMoveGenerator {
  getLegalMoves(piece: Piece): MoveCommand[] {
    const moves = super.getLegalMoves(piece)

    const row = piece.position.y
    const enemyColor = piece.color === 'white' ? 'black' : 'white'

    const castlePositionsConfig = [
      { rookX: 7, kingTargetX: 6, rookTargetX: 5, emptyXs: [5, 6] },
      { rookX: 0, kingTargetX: 2, rookTargetX: 3, emptyXs: [1, 2, 3] },
    ]

    for (const config of castlePositionsConfig) {
      const rook = this.board.getPieceAt(new Position(config.rookX, row))
      const kingSlideSquares = [piece.position.x, ...config.emptyXs]

      const isRookHasMoved = !rook || rook.type !== PieceType.Rook || rook.hasMoved
      const kingHasMoved = piece.hasMoved
      const hasEmptySquaresOnPath = config.emptyXs.some(x => this.board.getPieceAt(new Position(x, row)) !== null)
      const isSquareAttackedByEnemy = kingSlideSquares.some((x) => {
        return this.attackMapManager.isSquareAttacked(new Position(x, row), enemyColor)
      })

      if (isRookHasMoved || kingHasMoved || hasEmptySquaresOnPath || isSquareAttackedByEnemy)
        continue

      moves.push(new MoveCommand(piece, piece.position, new Position(config.kingTargetX, row), new CastleMoveExecutor(), {
        castle: { rookPiece: rook, rookNewPosition: new Position(config.rookTargetX, row) },
      }))
    }

    return moves
  }
}
