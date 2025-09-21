import type { IBoard } from '@/board/IBoard'
import type { MoveExecutor } from '@/moves/execution/MoveExecutor'
import type { MoveCommand } from '@/moves/MoveCommand'

export class CastleMoveExecutor implements MoveExecutor {
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
