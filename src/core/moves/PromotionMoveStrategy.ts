import type { MoveStrategy } from './MoveStrategy'
import type { MoveCommand } from '@/core/MoveCommand'
import type { IBoard } from '@/types/interfaces/IBoard'

export class PromotionMoveStrategy implements MoveStrategy {
  execute(move: MoveCommand, board: IBoard) {
    const { capturedPiece, promotionPiece } = move?.options ?? {}

    if (!promotionPiece)
      return

    promotionPiece.moveTo(move.to.clone())

    if (capturedPiece)
      board.removePieceAt(capturedPiece.position)

    board.removePieceAt(move.piece.position)
    board.setPieceAt(move.to, promotionPiece)
  }

  undo(move: MoveCommand, board: IBoard) {
    const { capturedPiece, promotionPiece } = move?.options ?? {}

    if (promotionPiece) {
      board.removePieceAt(move.to)
    }

    board.setPieceAt(move.piece.position, move.piece)

    if (capturedPiece)
      board.setPieceAt(capturedPiece.position, capturedPiece)
  }
}
