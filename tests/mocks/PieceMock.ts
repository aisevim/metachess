import type { IBoard } from '@/types/interfaces/IBoard'
import { MoveCommand } from '@/core/MoveCommand'
import { Position } from '@/core/Position'
import { Piece } from '@/pieces/Piece'

export class PieceMock extends Piece {
  readonly type = 'piece-mock'

  getLegalMoves(board: IBoard): MoveCommand[] {
    const direction = this.color === 'white' ? 1 : -1
    const forward = new Position(this.position.x, this.position.y + direction)

    if (!board.isInside(forward)) {
      return []
    }

    const target = board.getPieceAt(forward)

    if (!target) {
      return [new MoveCommand(this, this.position, forward)]
    }

    if (this.isEnemy(target)) {
      return [new MoveCommand(this, this.position, forward, 'normal', { capturedPiece: target })]
    }

    return []
  }
}
