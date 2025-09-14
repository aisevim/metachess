import type { IBoard } from '@/types/interfaces/IBoard'
import { Move } from '@/core/Move'
import { Position } from '@/core/Position'
import { Piece } from '@/pieces/Piece'

export abstract class SlidingPiece extends Piece {
  protected abstract readonly DIRECTIONS: { dx: number, dy: number }[]

  getLegalMoves(board: IBoard) {
    const moves: Move[] = []
    const { x, y } = this.position

    for (const { dx, dy } of this.DIRECTIONS) {
      for (let step = 1; step < board.size; step++) {
        const newPos = new Position(x + dx * step, y + dy * step)
        if (!board.isInside(newPos))
          break

        const piece = board.getPieceAt(newPos)
        if (!piece) {
          moves.push(new Move(this, this.position, newPos))
        }
        else {
          if (this.isEnemy(piece)) {
            moves.push(new Move(this, this.position, newPos, { capturedPiece: piece }))
          }
          break
        }
      }
    }

    return moves
  }
}
