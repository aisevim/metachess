import type { AttackMap } from '@/engine/attack/AttackMap'
import type { IBoard } from '@/engine/board/IBoard'
import type { Piece } from '@/engine/pieces/Piece'
import { Position } from '@/engine/board/Position'
import { NormalMoveExecutor } from '@/engine/moves/execution/NormalMoveExecutor'
import { MoveCommand } from '@/engine/moves/MoveCommand'

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
