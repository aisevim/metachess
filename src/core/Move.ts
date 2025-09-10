import type { Piece } from '@/pieces/Piece'
import type { Board } from '@/core/Board'
import type { Position } from '@/core/Position'

interface MoveOptions {
  capturedPiece?: Piece | null
}

export class Move {
  constructor(
    public piece: Piece,
    public to: Position,
    public options: MoveOptions = {},
  ) {
    this.options = {
      capturedPiece: null,
      ...options,
    }
  }

  execute(board: Board) {
    const { capturedPiece } = this.options
    if (capturedPiece)
      board.removePieceAt(capturedPiece.position)

    board.removePieceAt(this.piece.position)
    this.piece.position = this.to
    this.piece.hasMoved = true
    board.setPieceAt(this.to, this.piece)
  }
}
