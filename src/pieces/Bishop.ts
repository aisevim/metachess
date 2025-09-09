import { Board } from '../core/Board'
import { Move } from '../core/Move'
import { Position } from '../core/Position'
import { Piece } from './Piece'

export class Bishop extends Piece {
  private static readonly DIRECTIONS = [
    { dx: 1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: -1 },
  ] as const

  public getLegalMoves(board: Board): Move[] {
    const moves: Move[] = []

    for (const { dx, dy } of Bishop.DIRECTIONS) {
      for (let step = 1; step < Board.SIZE; step++) {
        const newPos = new Position(
          this.position.x + dx * step,
          this.position.y + dy * step
        )

        if (!board.isInside(newPos)) break

        const target = board.getPieceAt(newPos)
        if (!target) {
          moves.push(new Move(this, newPos))
        } else {
          if (this.isEnemy(target)) {
            moves.push(new Move(this, newPos, { capturedPiece: target }))
          }
          break
        }
      }
    }

    return moves
  }
}
