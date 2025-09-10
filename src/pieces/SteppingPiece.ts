import type { Board } from '@/core/Board.ts'
import { Move } from '@/core/Move.ts'
import { Position } from '@/core/Position.ts'
import { Piece } from '@/pieces/Piece.ts'

export abstract class SteppingPiece extends Piece {
  protected static readonly OFFSETS: { dx: number, dy: number }[] = []

  public getLegalMoves(board: Board): Move[] {
    const moves: Move[] = []
    const { x, y } = this.position

    for (const { dx, dy } of SteppingPiece.OFFSETS) {
      const newPos = new Position(x + dx, y + dy)
      if (!board.isInside(newPos))
        continue

      const piece = board.getPieceAt(newPos)
      if (!piece) {
        moves.push(new Move(this, newPos))
      }
      else if (this.isEnemy(piece)) {
        moves.push(new Move(this, newPos, { capturedPiece: piece }))
      }
    }

    return moves
  }
}
