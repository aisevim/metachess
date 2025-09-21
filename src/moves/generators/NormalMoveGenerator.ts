import type { AttackMapManager } from '@/attack/AttackMapManager'
import type { IBoard } from '@/board/IBoard'
import type { MoveGenerator } from '@/moves/generators/MoveGenerator'
import type { MoveCommand } from '@/moves/MoveCommand'
import type { Piece } from '@/pieces/Piece'

export class NormalMoveGenerator implements MoveGenerator {
  constructor(protected board: IBoard, protected attackMapManager: AttackMapManager) {}

  getLegalMoves(piece: Piece): MoveCommand[] {
    return this.attackMapManager.getAttackMoves(piece)
  }
}
