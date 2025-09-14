import type { IBoard } from '@/core/IBoard'
import { Move } from '@/core/Move.ts'
import { Position } from '@/core/Position.ts'
import { Piece } from '@/pieces/Piece.ts'

export abstract class SteppingPiece extends Piece {
  protected abstract readonly OFFSETS: { dx: number, dy: number }[]

  getLegalMoves(board: IBoard): Move[] {
    const moves: Move[] = []
    const { x, y } = this.position

    for (const { dx, dy } of this.OFFSETS) {
      const newPos = new Position(x + dx, y + dy)
      if (!board.isInside(newPos))
        continue

      const piece = board.getPieceAt(newPos)
      if (!piece) {
        moves.push(new Move(this, this.position, newPos))
      }
      else if (this.isEnemy(piece)) {
        moves.push(new Move(this, this.position, newPos, { capturedPiece: piece }))
      }
    }

    return moves
  }
}
