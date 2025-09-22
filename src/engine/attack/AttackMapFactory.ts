import type { AttackMap } from '@/engine/attack/AttackMap'
import type { Piece } from '@/engine/pieces/Piece'
import { JumpingAttackMap } from '@/engine/attack/JumpingAttackMap'
import { PawnAttackMap } from '@/engine/attack/PawnAttackMap'
import { SlidingAttackMap } from '@/engine/attack/SlidingAttackMap'
import { MovementType } from '@/engine/moves/enums/MovementType'

export class AttackMapFactory {
  create(piece: Piece): AttackMap {
    switch (piece.movementType) {
      case MovementType.Sliding:
        return new SlidingAttackMap()
      case MovementType.Stepping:
      case MovementType.Jumping:
        return new JumpingAttackMap()
      case MovementType.Pawn:
        return new PawnAttackMap()
      default:
        return new JumpingAttackMap()
    }
  }
}
