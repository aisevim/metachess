import type { Position } from '@/engine/board/Position'
import type { Piece } from '@/engine/pieces/Piece'

export interface IBoard {
  readonly size: number

  getPieceAt: (pos: Position) => Piece | null
  setPieceAt: (pos: Position, piece: Piece) => void
  removePieceAt: (pos: Position) => void
  isInside: (pos: Position) => boolean
  toSnapshot: () => (Piece | null)[][]
  getAllPieces: () => Piece[]
}
