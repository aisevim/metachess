import { MovementType } from '@/engine/moves/enums/MovementType'
import { PieceType } from '@/engine/pieces/enums/PieceType'
import { Piece } from '@/engine/pieces/Piece'

export class Pawn extends Piece {
  readonly type = PieceType.Pawn
  readonly movementType = MovementType.Pawn
  readonly offsets = []
}
