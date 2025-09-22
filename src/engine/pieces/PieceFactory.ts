import type { Position } from '@/engine/board/Position'
import type { Color } from '@/engine/types/enums/color'
import { PieceType } from '@/engine/pieces/enums/PieceType'
import { Bishop } from '@/engine/pieces/types/Bishop'
import { King } from '@/engine/pieces/types/King'
import { Knight } from '@/engine/pieces/types/Knight'
import { Pawn } from '@/engine/pieces/types/Pawn'
import { Queen } from '@/engine/pieces/types/Queen'
import { Rook } from '@/engine/pieces/types/Rook'

export class PieceFactory {
  static create(type: PieceType, color: Color, position: Position) {
    switch (type) {
      case PieceType.Pawn: return new Pawn(color, position)
      case PieceType.Queen: return new Queen(color, position)
      case PieceType.Rook: return new Rook(color, position)
      case PieceType.Bishop: return new Bishop(color, position)
      case PieceType.Knight: return new Knight(color, position)
      case PieceType.King: return new King(color, position)
      default: throw new Error('Unknown piece type')
    }
  }
}
