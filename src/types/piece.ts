import type { MoveCommand } from '@/core/MoveCommand'
import type { Position } from '@/core/Position'

export type pieceType = 'pawn' | 'king' | 'queen' | 'rook' | 'bishop' | 'knight'

export type promotionType = 'queen' | 'rook' | 'bishop' | 'knight'

export interface LegalMoveContext {
  history?: MoveCommand[]
  onCastling?: boolean
}

export interface PieceMemento {
  position: Position
  hasMoved: boolean
}
