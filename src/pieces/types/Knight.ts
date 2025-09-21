import { MovementType } from '@/moves/enums/MovementType'
import { PieceType } from '@/pieces/enums/PieceType'
import { Piece } from '@/pieces/Piece'

export class Knight extends Piece {
  readonly type = PieceType.Knight
  readonly movementType = MovementType.Jumping
  readonly offsets = [
    { dx: 1, dy: 2 },
    { dx: 2, dy: 1 },
    { dx: 2, dy: -1 },
    { dx: 1, dy: -2 },
    { dx: -1, dy: -2 },
    { dx: -2, dy: -1 },
    { dx: -2, dy: 1 },
    { dx: -1, dy: 2 },
  ]
}
