import type { Piece } from '@/pieces/Piece'
import type { ChessPosition } from '@/types/position'
import { Position } from '@/board/Position'
import { Color } from '@/types/enums/color'

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
    grid[p.y][p.x] = new PieceClass(Color.White, p)
  }

  for (const pos of setup.black) {
    const p = new Position(pos)
    grid[p.y][p.x] = new PieceClass(Color.Black, p)
  }

  return grid
}
