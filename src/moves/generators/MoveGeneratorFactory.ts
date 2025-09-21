import type { AttackMapManager } from '@/attack/AttackMapManager'
import type { IBoard } from '@/board/IBoard'
import type { MoveGenerator } from '@/moves/generators/MoveGenerator'
import type { MoveCommand } from '@/moves/MoveCommand'
import type { Piece } from '@/pieces/Piece'
import { KingMoveGenerator } from '@/moves/generators/KingMoveGenerator'
import { NormalMoveGenerator } from '@/moves/generators/NormalMoveGenerator'
import { PawnMoveGenerator } from '@/moves/generators/PawnMoveGenerator'
import { PieceType } from '@/pieces/enums/PieceType'

export class MoveGeneratorFactory {
  constructor(
    private board: IBoard,
    private attackMapManager: AttackMapManager,
    private history: MoveCommand[] = [],
  ) {}

  create(piece: Piece): MoveGenerator {
    switch (piece.type) {
      case PieceType.King:
        return new KingMoveGenerator(this.board, this.attackMapManager)
      case PieceType.Pawn:
        return new PawnMoveGenerator(this.board, this.attackMapManager, this.history)
      case PieceType.Queen:
      case PieceType.Bishop:
      case PieceType.Knight:
      case PieceType.Rook:
      default:
        return new NormalMoveGenerator(this.board, this.attackMapManager)
    }
  }
}
