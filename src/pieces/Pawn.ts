import type { IBoard } from '@/types/interfaces/IBoard'
import type { MoveType } from '@/types/move'
import type { LegalMoveContext } from '@/types/piece'
import { Move } from '@/core/Move'
import { Position } from '@/core/Position'
import { Piece } from '@/pieces/Piece'

export class Pawn extends Piece {
  public getLegalMoves(board: IBoard, context: LegalMoveContext) {
    const direction = this.color === 'white' ? 1 : -1

    return [
      ...this.getForwardMoves(board, direction),
      ...this.getDiagonalMoves(board, direction),
      ...this.getEnPassantMoves(context, direction),
    ]
  }

  private getForwardMoves(board: IBoard, direction: number): Move[] {
    const moves: Move[] = []
    const { x, y } = this.position

    const forward = new Position(x, y + direction)
    const doubleForward = new Position(x, y + 2 * direction)
    const canGoForward = board.isInside(forward) && !board.getPieceAt(forward)

    if (canGoForward) {
      moves.push(new Move(this, this.position, forward, { type: this.determineMoveType(board, forward) }))

      const canGoDoubleForward = !this.hasMoved && board.isInside(doubleForward) && !board.getPieceAt(doubleForward)
      if (canGoDoubleForward) {
        moves.push(new Move(this, this.position, doubleForward, { type: this.determineMoveType(board, doubleForward) }))
      }
    }

    return moves
  }

  private getDiagonalMoves(board: IBoard, direction: number): Move[] {
    const moves: Move[] = []
    const { x, y } = this.position;

    [1, -1].forEach((xd) => {
      const capturePosition = new Position(x + xd, y + direction)
      const capture = board.getPieceAt(capturePosition)

      if (capture && this.isEnemy(capture)) {
        moves.push(new Move(this, this.position, capturePosition, { capturedPiece: capture, type: this.determineMoveType(board, capturePosition) }))
      }
    })

    return moves
  }

  private getEnPassantMoves(context: LegalMoveContext, direction: number): Move[] {
    const moves: Move[] = []
    const lastMove = context?.history?.at(-1)
    const { x, y } = this.position

    if (!lastMove)
      return moves

    const isEnemyPawn = lastMove.piece instanceof Pawn && this.isEnemy(lastMove.piece)
    const hasMovedTwoSquaresForward = Math.abs(lastMove.from.y - lastMove.to.y) === 2
    const isNextTo = Math.abs(lastMove.to.x - x) === 1 && lastMove.to.y === y

    if (!isEnemyPawn || !hasMovedTwoSquaresForward || !isNextTo)
      return moves

    const newPosition = new Position(lastMove.to.x, y + direction)
    moves.push(new Move(this, this.position, newPosition, { capturedPiece: lastMove.piece, type: 'en passant' }))

    return moves
  }

  private determineMoveType(board: IBoard, position: Position): MoveType {
    const finalRank = this.color === 'white' ? board.size - 1 : 0

    return position.y === finalRank ? 'promotion' : 'normal'
  }
}
