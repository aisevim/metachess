import { MovementType } from '@/engine/moves/enums/MovementType'
import { PieceType } from '@/engine/pieces/enums/PieceType'
import { Piece } from '@/engine/pieces/Piece'

export class Queen extends Piece {
  readonly type = PieceType.Queen
  readonly movementType = MovementType.Sliding
  readonly offsets = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: -1 },
  ]
}
