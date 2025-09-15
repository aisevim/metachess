import type { Position } from '@/core/Position'
import type { Piece } from '@/pieces/Piece'
import type { IBoard } from '@/types/interfaces/IBoard'
import type { MoveOptions } from '@/types/move'

export class Move {
  constructor(
    public piece: Piece,
    public from: Position,
    public to: Position,
    public options: MoveOptions = {},
  ) {
    this.options = {
      type: 'normal',
      ...options,
    }
  }

  execute(board: IBoard) {
    const { type } = this.options

    if (type === 'promotion') {
      this.handlePromotionMove(board)
    }
    else if (type === 'castling') {
      this.handleCastleMove(board)
    }
    else if (type === 'normal' || type === 'en passant') {
      this.handleNormalMove(board)
    }
  }

  handlePromotionMove(board: IBoard) {
    const { capturedPiece, promotionPiece } = this.options

    if (!promotionPiece)
      return

    promotionPiece.position = this.to
    promotionPiece.hasMoved = true

    if (capturedPiece)
      board.removePieceAt(capturedPiece.position)

    board.removePieceAt(this.from)
    board.setPieceAt(this.to, promotionPiece)
  }

  handleCastleMove(board: IBoard) {
    const { rookPiece, rookNewPosition } = this.options.castle ?? {}

    if (!rookPiece || !rookNewPosition)
      return

    board.removePieceAt(this.piece.position)
    this.piece.moveTo(this.to)
    board.setPieceAt(this.to, this.piece)

    board.removePieceAt(rookPiece.position)
    rookPiece.moveTo(rookNewPosition)
    board.setPieceAt(rookNewPosition, rookPiece)
  }

  handleNormalMove(board: IBoard) {
    const { capturedPiece } = this.options

    if (capturedPiece)
      board.removePieceAt(capturedPiece.position)

    board.removePieceAt(this.from)
    this.piece.position = this.to
    this.piece.hasMoved = true
    board.setPieceAt(this.to, this.piece)
  }
}
