import type { Position } from '@/core/Position'
import type { Piece } from '@/pieces/Piece'
import type { IBoard } from '@/types/interfaces/IBoard'
import type { MoveOptions, MoveType } from '@/types/move'
import type { PieceMemento } from '@/types/piece'

export class MoveCommand {
  private pieceMemento: PieceMemento
  private rookMemento?: PieceMemento

  constructor(
    public piece: Piece,
    public from: Position,
    public to: Position,
    public type: MoveType = 'normal',
    public options?: MoveOptions,
  ) {
    this.pieceMemento = piece.createMemento()
    if (options?.castle)
      this.rookMemento = options.castle.rookPiece.createMemento()
  }

  execute(board: IBoard) {
    if (this.type === 'promotion') {
      this.handleExecutePromotionMove(board)
    }
    else if (this.type === 'castling') {
      this.handleExecuteCastleMove(board)
    }
    else if (this.type === 'en passant') {
      this.handleExecuteEnPassantMove(board)
    }
    else if (this.type === 'normal') {
      this.handleExecuteNormalMove(board)
    }
  }

  undo(board: IBoard) {
    if (this.type === 'promotion') {
      this.handleUndoPromotionMove(board)
    }
    else if (this.type === 'castling') {
      this.handleUndoCastleMove(board)
    }
    else if (this.type === 'en passant') {
      this.handleUndoEnPassantMove(board)
    }
    else if (this.type === 'normal') {
      this.handleUndoNormalMove(board)
    }
  }

  handleExecutePromotionMove(board: IBoard) {
    const { capturedPiece, promotionPiece } = this.options ?? {}

    if (!promotionPiece)
      return

    promotionPiece.position = this.to.clone()
    promotionPiece.hasMoved = true

    if (capturedPiece)
      board.removePieceAt(capturedPiece.position)

    board.removePieceAt(this.piece.position)
    board.setPieceAt(this.to, promotionPiece)
  }

  handleUndoPromotionMove(board: IBoard) {
    const { capturedPiece, promotionPiece } = this.options ?? {}

    if (promotionPiece) {
      board.removePieceAt(this.to)
    }

    this.piece.restoreMemento(this.pieceMemento)
    board.setPieceAt(this.piece.position, this.piece)

    if (capturedPiece) {
      board.setPieceAt(capturedPiece.position, capturedPiece)
    }
  }

  handleExecuteCastleMove(board: IBoard) {
    const { rookPiece, rookNewPosition } = this.options?.castle ?? {}

    if (!rookPiece || !rookNewPosition)
      return

    board.removePieceAt(this.piece.position)
    this.piece.position = this.to.clone()
    this.piece.hasMoved = true
    board.setPieceAt(this.to, this.piece)

    board.removePieceAt(rookPiece.position)
    rookPiece.position = rookNewPosition.clone()
    rookPiece.hasMoved = true
    board.setPieceAt(rookNewPosition, rookPiece)
  }

  handleUndoCastleMove(board: IBoard) {
    const { rookPiece, rookNewPosition } = this.options?.castle ?? {}

    if (!rookNewPosition || !rookPiece || !this.rookMemento)
      return

    board.removePieceAt(this.to)
    this.piece.restoreMemento(this.pieceMemento)
    board.setPieceAt(this.piece.position, this.piece)

    board.removePieceAt(rookNewPosition)
    rookPiece.restoreMemento(this.rookMemento)
    board.setPieceAt(rookPiece.position, rookPiece)
  }

  handleExecuteEnPassantMove(board: IBoard) {
    const { capturedPiece } = this.options ?? {}

    if (capturedPiece)
      board.removePieceAt(capturedPiece.position)

    board.removePieceAt(this.piece.position)
    this.piece.position = this.to.clone()
    this.piece.hasMoved = true
    board.setPieceAt(this.to, this.piece)
  }

  handleUndoEnPassantMove(board: IBoard) {
    const { capturedPiece } = this.options ?? {}
    board.removePieceAt(this.to)

    this.piece.restoreMemento(this.pieceMemento)
    board.setPieceAt(this.piece.position, this.piece)

    if (capturedPiece) {
      board.setPieceAt(capturedPiece.position, capturedPiece)
    }
  }

  handleExecuteNormalMove(board: IBoard) {
    const { capturedPiece } = this.options ?? {}

    if (capturedPiece)
      board.removePieceAt(capturedPiece.position)

    board.removePieceAt(this.piece.position)
    this.piece.position = this.to.clone()
    this.piece.hasMoved = true
    board.setPieceAt(this.to, this.piece)
  }

  handleUndoNormalMove(board: IBoard) {
    const { capturedPiece } = this.options ?? {}
    board.removePieceAt(this.to)

    this.piece.restoreMemento(this.pieceMemento)
    board.setPieceAt(this.piece.position, this.piece)

    if (capturedPiece) {
      board.setPieceAt(capturedPiece.position, capturedPiece)
    }
  }
}
