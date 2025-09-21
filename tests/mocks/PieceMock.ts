import type { PieceType } from '@/pieces/enums/PieceType'
import { MovementType } from '@/moves/enums/MovementType'
import { Piece } from '@/pieces/Piece'

export class PieceMock extends Piece {
  readonly type = 'piece-mock' as unknown as PieceType
  readonly movementType = MovementType.Stepping
  readonly offsets = [
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
  ]
}
