import type { PieceType } from '@/engine/pieces/enums/PieceType'
import { MovementType } from '@/engine/moves/enums/MovementType'
import { Piece } from '@/engine/pieces/Piece'

export class PieceMock extends Piece {
  readonly type = 'piece-mock' as unknown as PieceType
  readonly movementType = MovementType.Stepping
  readonly offsets = [
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
  ]
}
