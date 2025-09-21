import type { Position } from '@/board/Position'

export interface PieceMemento {
  position: Position
  hasMoved: boolean
}
