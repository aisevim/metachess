import type { Move } from '@/core/Move'

export type pieceType = 'pawn' | 'king' | 'queen' | 'rook' | 'bishop' | 'knight'

export type promotionType = 'queen' | 'rook' | 'bishop' | 'knight'

export interface LegalMoveContext {
  history?: Move[]
}
