import type { Position } from '@/core/Position'
import type { Piece } from '@/pieces/Piece'

export type MoveType = 'normal' | 'castling' | 'en passant' | 'promotion'

export interface MoveOptions {
  capturedPiece?: Piece | null
  promotionPiece?: Piece | null
  castle?: {
    rookPiece: Piece
    rookNewPosition: Position
  }
}
