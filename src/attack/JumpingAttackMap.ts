import type { AttackMap } from '@/attack/AttackMap'
import type { IBoard } from '@/board/IBoard'
import type { Piece } from '@/pieces/Piece'
import { Position } from '@/board/Position'
import { NormalMoveExecutor } from '@/moves/execution/NormalMoveExecutor'
import { MoveCommand } from '@/moves/MoveCommand'

export class JumpingAttackMap implements AttackMap {
  getAttackMoves(piece: Piece, board: IBoard): MoveCommand[] {
    const moves: MoveCommand[] = []
    const { x, y } = piece.position

    for (const { dx, dy } of piece.offsets) {
      const to = new Position(x + dx, y + dy)
      if (!board.isInside(to))
        continue

      const target = board.getPieceAt(to)
      if (!target || piece.isEnemy(target)) {
        const options = target ? { capturedPiece: target } : {}
        moves.push(new MoveCommand(piece, piece.position, to, new NormalMoveExecutor(), options))
      }
    }

    return moves
  }
}
