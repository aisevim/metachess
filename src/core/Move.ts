import type { Position } from '@/core/Position'
import type { Piece } from '@/pieces/Piece'
import type { IBoard } from '@/types/interfaces/IBoard'

interface MoveOptions {
  capturedPiece?: Piece | null
  type?: 'normal' | 'castling' | 'en passant' | 'promotion'
}

export class Move {
  constructor(
    public piece: Piece,
    public from: Position,
    public to: Position,
    public options: MoveOptions = {},
  ) {
    this.options = {
      capturedPiece: null,
      type: 'normal',
      ...options,
    }
  }

  execute(board: IBoard) {
    const { capturedPiece } = this.options

    if (capturedPiece)
      board.removePieceAt(capturedPiece.position)

    board.removePieceAt(this.from)
    this.piece.position = this.to
    this.piece.hasMoved = true
    board.setPieceAt(this.to, this.piece)
  }
}
