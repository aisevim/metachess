import type { ChessPosition } from '@/core/Position'
import type { Piece } from '@/pieces/Piece'
import type { Color } from '@/types/Color'
import { Position } from '@/core/Position'

export function createGridWithPieces(
  PieceClass: new (color: Color, position: Position) => Piece,
  setup: {
    white: ChessPosition[]
    black: ChessPosition[]
  },
  length = 8,
): (Piece | null)[][] {
  const grid: (Piece | null)[][] = Array.from({ length }, () => Array.from({ length }, () => null))

  for (const pos of setup.white) {
    const p = new Position(pos)
    grid[p.y][p.x] = new PieceClass('white', p)
  }

  for (const pos of setup.black) {
    const p = new Position(pos)
    grid[p.y][p.x] = new PieceClass('black', p)
  }

  return grid
}
