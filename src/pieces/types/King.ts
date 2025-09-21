import { MovementType } from '@/moves/enums/MovementType'
import { PieceType } from '@/pieces/enums/PieceType'
import { Piece } from '@/pieces/Piece'

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
