import type { MoveStrategy } from './MoveStrategy'
import type { MoveCommand } from '@/core/MoveCommand'
import type { IBoard } from '@/types/interfaces/IBoard'

export class CaslteMoveStrategy implements MoveStrategy {
  execute(move: MoveCommand, board: IBoard) {
    const { rookPiece, rookNewPosition } = move?.options?.castle ?? {}

    if (!rookPiece || !rookNewPosition)
      return

    board.removePieceAt(move.piece.position)
    move.piece.moveTo(move.to.clone())
    board.setPieceAt(move.to, move.piece)

    board.removePieceAt(rookPiece.position)
    rookPiece.moveTo(rookNewPosition.clone())
    board.setPieceAt(rookNewPosition, rookPiece)
  }

  undo(move: MoveCommand, board: IBoard) {
    const { rookPiece, rookNewPosition } = move?.options?.castle ?? {}

    if (!rookPiece || !rookNewPosition)
      return

    board.removePieceAt(move.to)
    board.setPieceAt(move.piece.position, move.piece)

    board.removePieceAt(rookNewPosition)
    board.setPieceAt(rookPiece.position, rookPiece)
  }
}
