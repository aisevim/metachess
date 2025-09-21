import { MovementType } from '@/moves/enums/MovementType'
import { PieceType } from '@/pieces/enums/PieceType'
import { Piece } from '@/pieces/Piece'

export class Bishop extends Piece {
  readonly type = PieceType.Bishop
  readonly movementType = MovementType.Sliding
  readonly offsets = [
    { dx: 1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: -1 },
  ]
}
