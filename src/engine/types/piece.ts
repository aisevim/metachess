import type { Position } from '@/engine/board/Position'

export interface PieceMemento {
  position: Position
  hasMoved: boolean
}
