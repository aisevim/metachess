import type { Position } from './Position'
import type { Color } from '@/types/color'
import type { pieceType, promotionType } from '@/types/piece'
import { Bishop } from '@/pieces/Bishop'
import { King } from '@/pieces/King'
import { Knight } from '@/pieces/Knight'
import { Pawn } from '@/pieces/Pawn'
import { Queen } from '@/pieces/Queen'
import { Rook } from '@/pieces/Rook'

export class PieceFactory {
  static create(type: pieceType, color: Color, position: Position) {
    switch (type) {
      case 'pawn': return new Pawn(color, position)
      case 'queen': return new Queen(color, position)
      case 'rook': return new Rook(color, position)
      case 'bishop': return new Bishop(color, position)
      case 'knight': return new Knight(color, position)
      case 'king': return new King(color, position)
      default: throw new Error('Unknown piece type')
    }
  }

  static createPromotionPiece(type: promotionType, color: Color, pos: Position) {
    switch (type) {
      case 'queen':
      case 'rook':
      case 'knight':
      case 'bishop':
        return PieceFactory.create(type, color, pos)
    }
  }
}
