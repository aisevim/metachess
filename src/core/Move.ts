import type { IBoard } from './IBoard'
import type { Position } from '@/core/Position'
import type { Piece } from '@/pieces/Piece'

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

  execute(board: IBoard) {
    const { capturedPiece } = this.options
    if (capturedPiece)
      board.removePieceAt(capturedPiece.position)

    board.removePieceAt(this.piece.position)
    this.piece.position = this.to
    this.piece.hasMoved = true
    board.setPieceAt(this.to, this.piece)
  }
}
