import type { AttackMapManager } from '@/engine/attack/AttackMapManager'
import type { IBoard } from '@/engine/board/IBoard'
import type { MoveGenerator } from '@/engine/moves/generators/MoveGenerator'
import type { MoveCommand } from '@/engine/moves/MoveCommand'
import type { Piece } from '@/engine/pieces/Piece'
import { KingMoveGenerator } from '@/engine/moves/generators/KingMoveGenerator'
import { NormalMoveGenerator } from '@/engine/moves/generators/NormalMoveGenerator'
import { PawnMoveGenerator } from '@/engine/moves/generators/PawnMoveGenerator'
import { PieceType } from '@/engine/pieces/enums/PieceType'

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
