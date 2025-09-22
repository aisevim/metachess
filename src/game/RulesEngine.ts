import type { AttackMapManager } from '@/attack/AttackMapManager'
import type { IBoard } from '@/board/IBoard'
import type { MoveCommand } from '@/moves/MoveCommand'
import type { Piece } from '@/pieces/Piece'
import { MoveGeneratorFactory } from '@/moves/generators/MoveGeneratorFactory'
import { PieceType } from '@/pieces/enums/PieceType'
import { Color } from '@/types/enums/color'

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
    return generator.getLegalMoves(piece)
  }

  isKingInCheck(color: Color): boolean {
    const king = this.board.getAllPieces().find(p => p.color === color && p.type === PieceType.King)
    if (!king)
      throw new Error(`No king found for color ${color}`)

    const enemyColor = color === Color.White ? Color.Black : Color.White
    return this.attackMapManager.isSquareAttacked(king.position, enemyColor)
  }

  private hasLegalMoves(color: Color): boolean {
    return this.board.getAllPieces()
      .filter(p => p.color === color)
      .some(piece => this.getLegalMoves(piece).length > 0)
  }

  isCheckmate(color: Color): boolean {
    return this.isKingInCheck(color) && !this.hasLegalMoves(color)
  }

  isStalemate(color: Color): boolean {
    return !this.isKingInCheck(color) && !this.hasLegalMoves(color)
  }
}
