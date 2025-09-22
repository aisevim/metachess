import type { AttackMap } from '@/engine/attack/AttackMap'
import type { IBoard } from '@/engine/board/IBoard'
import type { Piece } from '@/engine/pieces/Piece'
import { Position } from '@/engine/board/Position'
import { NormalMoveExecutor } from '@/engine/moves/execution/NormalMoveExecutor'
import { MoveCommand } from '@/engine/moves/MoveCommand'

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
