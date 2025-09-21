import { MovementType } from '@/moves/enums/MovementType'
import { PieceType } from '@/pieces/enums/PieceType'
import { Piece } from '@/pieces/Piece'

export class Rook extends Piece {
  readonly type = PieceType.Rook
  readonly movementType = MovementType.Sliding
  readonly offsets = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
  ]
}
