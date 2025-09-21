import type { IBoard } from '@/board/IBoard'
import type { MoveExecutor } from '@/moves/execution/MoveExecutor'
import type { MoveCommand } from '@/moves/MoveCommand'

export class PromotionMoveExecutor implements MoveExecutor {
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
