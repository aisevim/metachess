import type { IBoard } from '@/types/interfaces/IBoard'
import { Move } from '@/core/Move'
import { Position } from '@/core/Position'
import { Piece } from '@/pieces/Piece'

export class PieceMock extends Piece {
  readonly type = 'piece-mock'

  getLegalMoves(board: IBoard): Move[] {
    const direction = this.color === 'white' ? 1 : -1
    const forward = new Position(this.position.x, this.position.y + direction)

    if (!board.isInside(forward)) {
      return []
    }

    const target = board.getPieceAt(forward)

    if (!target) {
      return [new Move(this, this.position, forward)]
    }

    if (this.isEnemy(target)) {
      return [new Move(this, this.position, forward, { capturedPiece: target })]
    }

    return []
  }
}
