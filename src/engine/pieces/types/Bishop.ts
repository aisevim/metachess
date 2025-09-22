import { MovementType } from '@/engine/moves/enums/MovementType'
import { PieceType } from '@/engine/pieces/enums/PieceType'
import { Piece } from '@/engine/pieces/Piece'

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
