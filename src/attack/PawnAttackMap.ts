import type { AttackMap } from '@/attack/AttackMap'
import type { IBoard } from '@/board/IBoard'
import type { Piece } from '@/pieces/Piece'
import { Position } from '@/board/Position'
import { NormalMoveExecutor } from '@/moves/execution/NormalMoveExecutor'
import { MoveCommand } from '@/moves/MoveCommand'
import { Color } from '@/types/enums/color'

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
