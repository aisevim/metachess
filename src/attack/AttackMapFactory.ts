import type { AttackMap } from '@/attack/AttackMap'
import type { Piece } from '@/pieces/Piece'
import { JumpingAttackMap } from '@/attack/JumpingAttackMap'
import { PawnAttackMap } from '@/attack/PawnAttackMap'
import { SlidingAttackMap } from '@/attack/SlidingAttackMap'
import { MovementType } from '@/moves/enums/MovementType'

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
