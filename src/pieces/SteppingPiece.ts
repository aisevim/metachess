import type { IBoard } from '@/types/interfaces/IBoard'
import { MoveCommand } from '@/core/MoveCommand.ts'
import { Position } from '@/core/Position.ts'
import { Piece } from '@/pieces/Piece.ts'

export abstract class SteppingPiece extends Piece {
  protected abstract readonly OFFSETS: { dx: number, dy: number }[]

  getLegalMoves(board: IBoard): MoveCommand[] {
    const moves: MoveCommand[] = []
    const { x, y } = this.position

    for (const { dx, dy } of this.OFFSETS) {
      const newPos = new Position(x + dx, y + dy)
      if (!board.isInside(newPos))
        continue

      const piece = board.getPieceAt(newPos)
      if (!piece) {
        moves.push(new MoveCommand(this, this.position, newPos))
      }
      else if (this.isEnemy(piece)) {
        moves.push(new MoveCommand(this, this.position, newPos, 'normal', { capturedPiece: piece }))
      }
    }

    return moves
  }
}
