import type { Position } from '@/board/Position'
import type { Color } from '@/types/color'
import { PieceType } from '@/pieces/enums/PieceType'
import { Bishop } from '@/pieces/types/Bishop'
import { King } from '@/pieces/types/King'
import { Knight } from '@/pieces/types/Knight'
import { Pawn } from '@/pieces/types/Pawn'
import { Queen } from '@/pieces/types/Queen'
import { Rook } from '@/pieces/types/Rook'

type PromotionType = PieceType.Bishop | PieceType.Knight | PieceType.Queen | PieceType.Rook

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

  static createPromotionPiece(type: PromotionType, color: Color, pos: Position) {
    switch (type) {
      case PieceType.Queen:
      case PieceType.Rook:
      case PieceType.Knight:
      case PieceType.Bishop:
        return PieceFactory.create(type, color, pos)
    }
  }
}
