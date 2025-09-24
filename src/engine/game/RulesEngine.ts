import type { AttackMapManager } from '@/engine/attack/AttackMapManager'
import type { IBoard } from '@/engine/board/IBoard'
import type { MoveCommand } from '@/engine/moves/MoveCommand'
import type { Piece } from '@/engine/pieces/Piece'
import { MoveGeneratorFactory } from '@/engine/moves/generators/MoveGeneratorFactory'
import { PieceType } from '@/engine/pieces/enums/PieceType'
import { Color } from '@/engine/types/enums/color'

export class RulesEngine {
  private moveGeneratorFactory: MoveGeneratorFactory

  constructor(
    private board: IBoard,
    private attackMapManager: AttackMapManager,
    private history: MoveCommand[] = [],
  ) {
    this.moveGeneratorFactory = new MoveGeneratorFactory(this.board, this.attackMapManager, this.history)
  }

  getLegalMoves(piece: Piece): MoveCommand[] {
    const generator = this.moveGeneratorFactory.create(piece)
    const moves = generator.getLegalMoves(piece)

    return moves.filter(move => this.isMoveLegal(move, piece.color))
  }

  isKingInCheck(color: Color): boolean {
    const king = this.board.getAllPieces().find(p => p.color === color && p.type === PieceType.King)
    if (!king)
      return false

    const enemyColor = color === Color.White ? Color.Black : Color.White
    return this.attackMapManager.isSquareAttacked(king.position, enemyColor)
  }

  isCheckmate(color: Color): boolean {
    return this.isKingInCheck(color) && !this.hasLegalMoves(color)
  }

  isStalemate(color: Color): boolean {
    return !this.isKingInCheck(color) && !this.hasLegalMoves(color)
  }

  private isMoveLegal(move: MoveCommand, color: Color): boolean {
    move.execute(this.board)
    this.attackMapManager.recomputeAll()

    const safe = !this.isKingInCheck(color)

    move.undo(this.board)
    this.attackMapManager.recomputeAll()

    return safe
  }

  private hasLegalMoves(color: Color): boolean {
    return this.board.getAllPieces()
      .filter(p => p.color === color)
      .some(piece => this.getLegalMoves(piece).length > 0)
  }
}
