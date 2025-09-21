import type { Position } from '@/board/Position'
import type { Piece } from '@/pieces/Piece'

export interface IBoard {
  readonly size: number

  getPieceAt: (pos: Position) => Piece | null
  setPieceAt: (pos: Position, piece: Piece) => void
  removePieceAt: (pos: Position) => void
  isInside: (pos: Position) => boolean
  toSnapshot: () => (Piece | null)[][]
  getAllPieces: () => Piece[]
}
