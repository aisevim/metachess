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
    const { x, y } = this.position

    for (const { dx, dy } of Bishop.DIRECTIONS) {
      for (let step = 1; step < Board.SIZE; step++) {
        const newPos = new Position(x + dx * step, y + dy * step)
        if (!board.isInside(newPos)) break

        const piece = board.getPieceAt(newPos)
        if (!piece) {
          moves.push(new Move(this, newPos))
        } else {
          if (this.isEnemy(piece)) {
            moves.push(new Move(this, newPos, { capturedPiece: piece }))
          }
          break
        }
      }
    }

    return moves
  }
}
