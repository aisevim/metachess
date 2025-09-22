import type { IBoard } from '@/engine/board/IBoard'
import type { MoveExecutor } from '@/engine/moves/execution/MoveExecutor'
import type { MoveCommand } from '@/engine/moves/MoveCommand'

export class EnPassantMoveExecutor implements MoveExecutor {
  execute(move: MoveCommand, board: IBoard) {
    const { capturedPiece } = move?.options ?? {}

    if (capturedPiece)
      board.removePieceAt(capturedPiece.position)

    board.removePieceAt(move.piece.position)
    move.piece.moveTo(move.to.clone())
    board.setPieceAt(move.to, move.piece)
  }

  undo(move: MoveCommand, board: IBoard) {
    const { capturedPiece } = move?.options ?? {}

    board.removePieceAt(move.to)
    board.setPieceAt(move.piece.position, move.piece)

    if (capturedPiece)
      board.setPieceAt(capturedPiece.position, capturedPiece)
  }
}
