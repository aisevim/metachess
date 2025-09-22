import type { Piece } from '@/engine/pieces/Piece'
import { Position } from '@/engine/board/Position'
import { CastleMoveExecutor } from '@/engine/moves/execution/CastleMoveExecutor'
import { NormalMoveGenerator } from '@/engine/moves/generators/NormalMoveGenerator'
import { MoveCommand } from '@/engine/moves/MoveCommand'
import { PieceType } from '@/engine/pieces/enums/PieceType'
import { Color } from '@/engine/types/enums/color'

export class KingMoveGenerator extends NormalMoveGenerator {
  getLegalMoves(piece: Piece): MoveCommand[] {
    const moves = super.getLegalMoves(piece)

    const row = piece.position.y
    const enemyColor = piece.color === Color.White ? Color.Black : Color.White

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
