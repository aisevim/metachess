import type { MoveStrategy } from './MoveStrategy'
import type { MoveCommand } from '@/core/MoveCommand'
import type { Piece } from '@/pieces/Piece'
import type { IBoard } from '@/types/interfaces/IBoard'

export class NormalMoveStrategy implements MoveStrategy {
  private capturedPiece: Piece | null = null

  execute(move: MoveCommand, board: IBoard) {
    this.capturedPiece = board.getPieceAt(move.to) ?? null

    if (this.capturedPiece)
      board.removePieceAt(this.capturedPiece.position)

    board.removePieceAt(move.piece.position)
    move.piece.moveTo(move.to.clone())
    board.setPieceAt(move.to, move.piece)
  }

  undo(move: MoveCommand, board: IBoard) {
    board.removePieceAt(move.to)
    board.setPieceAt(move.piece.position, move.piece)

    if (this.capturedPiece)
      board.setPieceAt(this.capturedPiece.position, this.capturedPiece)
  }
}
