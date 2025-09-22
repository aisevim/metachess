import type { AttackMap } from '@/engine/attack/AttackMap'
import type { IBoard } from '@/engine/board/IBoard'
import type { Piece } from '@/engine/pieces/Piece'
import { Position } from '@/engine/board/Position'
import { NormalMoveExecutor } from '@/engine/moves/execution/NormalMoveExecutor'
import { MoveCommand } from '@/engine/moves/MoveCommand'
import { Color } from '@/engine/types/enums/color'

export class PawnAttackMap implements AttackMap {
  getAttackMoves(piece: Piece, board: IBoard): MoveCommand[] {
    const moves: MoveCommand[] = []
    const { x, y } = piece.position
    const direction = piece.color === Color.White ? 1 : -1

    const diagonalsOffsets = [1, -1]
    diagonalsOffsets.forEach((xd) => {
      const to = new Position(x + xd, y + direction)
      const target = board.getPieceAt(to)

      if (target && piece.isEnemy(target)) {
        moves.push(new MoveCommand(piece, piece.position, to, new NormalMoveExecutor(), { capturedPiece: target }))
      }
    })

    return moves
  }
}
