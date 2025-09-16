import type { Color } from '../color'
import type { Position } from '@/core/Position'
import type { Piece } from '@/pieces/Piece'

export interface IBoard {
  readonly size: number

  getPieceAt: (pos: Position) => Piece | null
  setPieceAt: (pos: Position, piece: Piece) => void
  removePieceAt: (pos: Position) => void
  isInside: (pos: Position) => boolean
  toSnapshot: () => (Piece | null)[][]
  isSquareAttackedByEnemy: (pos: Position, color: Color) => boolean
}
