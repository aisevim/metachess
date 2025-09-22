import { MovementType } from '@/engine/moves/enums/MovementType'
import { PieceType } from '@/engine/pieces/enums/PieceType'
import { Piece } from '@/engine/pieces/Piece'

export class King extends Piece {
  readonly type = PieceType.King
  readonly movementType = MovementType.Stepping
  readonly offsets = [
    { dx: -1, dy: -1 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: 1 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: 1, dy: 0 },
    { dx: 1, dy: 1 },
  ]
}
