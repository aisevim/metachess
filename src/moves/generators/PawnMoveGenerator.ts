import type { AttackMapManager } from '@/attack/AttackMapManager'
import type { IBoard } from '@/board/IBoard'
import type { MoveGenerator } from '@/moves/generators/MoveGenerator'
import type { Piece } from '@/pieces/Piece'
import { Position } from '@/board/Position'
import { EnPassantMoveExecutor } from '@/moves/execution/EnPassantMoveExecutor'
import { NormalMoveExecutor } from '@/moves/execution/NormalMoveExecutor'
import { PromotionMoveExecutor } from '@/moves/execution/PromotionMoveExecutor'
import { MoveCommand } from '@/moves/MoveCommand'
import { PieceType } from '@/pieces/enums/PieceType'

export class PawnMoveGenerator implements MoveGenerator {
  constructor(private board: IBoard, private attackMapManager: AttackMapManager, private history: MoveCommand[] = []) {}

  getLegalMoves(piece: Piece): MoveCommand[] {
    const moves: MoveCommand[] = []
    const { x, y } = piece.position

    const direction = piece.color === 'white' ? 1 : -1
    const promotionRank = piece.color === 'white' ? this.board.size - 1 : 0
    const strategy = (p: Position) => p.y === promotionRank ? new PromotionMoveExecutor() : new NormalMoveExecutor()

    // --- Avance simple ---
    const forward = new Position(x, y + direction)
    const doubleForward = new Position(x, y + 2 * direction)
    const canGoForward = this.board.isInside(forward) && !this.board.getPieceAt(forward)
    const canGoDoubleForward = !piece.hasMoved && this.board.isInside(doubleForward) && !this.board.getPieceAt(doubleForward)

    if (canGoForward) {
      moves.push(new MoveCommand(piece, piece.position, forward, strategy(forward)))

      if (canGoDoubleForward) {
        moves.push(new MoveCommand(piece, piece.position, doubleForward, new NormalMoveExecutor()))
      }
    }

    for (const move of this.attackMapManager.getAttackMoves(piece)) {
      const target = this.board.getPieceAt(move.to)
      moves.push(new MoveCommand(move.piece, move.from, move.to, strategy(move.to), { capturedPiece: target }))
    }

    const lastMove = this.history?.at(-1)
    if (lastMove) {
      const isEnemyPawn = lastMove.piece.type === PieceType.Pawn && piece.isEnemy(lastMove.piece)
      const hasMovedTwoSquaresForward = Math.abs(lastMove.from.y - lastMove.to.y) === 2
      const isNextTo = Math.abs(lastMove.to.x - x) === 1 && lastMove.to.y === y

      if (!isEnemyPawn || !hasMovedTwoSquaresForward || !isNextTo) {
        return moves
      }

      const newPosition = new Position(lastMove.to.x, y + direction)
      moves.push(new MoveCommand(piece, piece.position, newPosition, new EnPassantMoveExecutor(), { capturedPiece: lastMove.piece }))
    }

    return moves
  }
}
