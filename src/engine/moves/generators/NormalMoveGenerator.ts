import type { AttackMapManager } from '@/engine/attack/AttackMapManager'
import type { IBoard } from '@/engine/board/IBoard'
import type { MoveGenerator } from '@/engine/moves/generators/MoveGenerator'
import type { MoveCommand } from '@/engine/moves/MoveCommand'
import type { Piece } from '@/engine/pieces/Piece'

export class NormalMoveGenerator implements MoveGenerator {
  constructor(protected board: IBoard, protected attackMapManager: AttackMapManager) {}

  getLegalMoves(piece: Piece): MoveCommand[] {
    return this.attackMapManager.getAttackMoves(piece)
  }
}
