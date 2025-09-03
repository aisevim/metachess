import type { Piece } from '../pieces/Piece'
import type { Board } from './Board'
import { MoveOptions } from '../types/Move'
import { Position } from './Position'

export class Move {
  constructor(
    public piece: Piece,
    public to: Position,
    public options: MoveOptions = {},
  ) {
    this.options = {
      capture: false,
      enPassant: false,
      capturedPiece: null,
      ...options
    }
  }

  execute(board: Board) {
    const { capture, enPassant, capturedPiece } = this.options
    const isCapured = capture && capturedPiece
    const isEnPassant = enPassant && capturedPiece
    
    if (isCapured || isEnPassant) {
      board.removePieceAt(capturedPiece.position)
    }

    board.removePieceAt(this.piece.position)
    this.movePiece()
    board.setPieceAt(this.to, this.piece)
  }

  private movePiece() {
    this.piece.position = this.to
    this.piece.hasMoved = true
  }
}
