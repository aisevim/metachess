import type { AttackMap } from '@/attack/AttackMap'
import type { IBoard } from '@/board/IBoard'
import type { Piece } from '@/pieces/Piece'
import { Position } from '@/board/Position'
import { NormalMoveExecutor } from '@/moves/execution/NormalMoveExecutor'
import { MoveCommand } from '@/moves/MoveCommand'

export class SlidingAttackMap implements AttackMap {
  getAttackMoves(piece: Piece, board: IBoard): MoveCommand[] {
    const moves: MoveCommand[] = []
    const { x, y } = piece.position

    for (const { dx, dy } of piece.offsets) {
      for (let step = 1; step < board.size; step++) {
        const to = new Position(x + dx * step, y + dy * step)
        if (!board.isInside(to))
          break

        const target = board.getPieceAt(to)
        if (!target || piece.isEnemy(target)) {
          const options = target && piece.isEnemy(target) ? { capturedPiece: target } : {}

          moves.push(new MoveCommand(piece, piece.position, to, new NormalMoveExecutor(), options))
        }

        if (target)
          break
      }
    }

    return moves
  }
}
