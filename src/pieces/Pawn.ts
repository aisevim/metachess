import type { IBoard } from '@/core/IBoard'
import type { LegalMoveContext } from '@/types/Piece'
import { Move } from '@/core/Move'
import { Position } from '@/core/Position'
import { Piece } from '@/pieces/Piece'

export class Pawn extends Piece {
  public getLegalMoves(board: IBoard) {
    const direction = this.color === 'white' ? 1 : -1

    return [
      ...this.getForwardMoves(board, direction),
      ...this.getDiagonalMoves(board, direction),
    ]
  }

  private getForwardMoves(board: IBoard, direction: number): Move[] {
    const moves: Move[] = []
    const { x, y } = this.position

    const forward = new Position(x, y + direction)
    const doubleForward = new Position(x, y + 2 * direction)
    const canGoForward = board.isInside(forward) && !board.getPieceAt(forward)

    if (canGoForward) {
      moves.push(new Move(this, forward))

      const canGoDoubleForward = !this.hasMoved && board.isInside(doubleForward) && !board.getPieceAt(doubleForward)
      if (canGoDoubleForward) {
        moves.push(new Move(this, doubleForward))
      }
    }

    return moves
  }

  private getDiagonalMoves(board: IBoard, direction: number): Move[] {
    const moves: Move[] = []
    const { x, y } = this.position;

    [1, -1].forEach((xd) => {
      const capturePosition = new Position(x + xd, y + direction)
      const capture = board.getPieceAt(capturePosition)

      if (capture && this.isEnemy(capture)) {
        moves.push(new Move(this, capturePosition, { capturedPiece: capture }))
      }
    })

    return moves
  }
}
