import { MovementType } from '@/moves/enums/MovementType'
import { PieceType } from '@/pieces/enums/PieceType'
import { Piece } from '@/pieces/Piece'

export class Pawn extends Piece {
  readonly type = PieceType.Pawn
  readonly movementType = MovementType.Pawn
  readonly offsets = []
}
