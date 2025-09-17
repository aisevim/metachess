import type { MoveStrategy } from './MoveStrategy'
import type { MoveCommand } from '@/core/MoveCommand'
import type { IBoard } from '@/types/interfaces/IBoard'

export class EnPassantMoveStrategy implements MoveStrategy {
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
