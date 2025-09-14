import type { Board } from '@/core/Board'
import type { ChessPosition } from '@/core/Position'
import type { Piece } from '@/pieces/Piece'
import type { Color } from '@/types/Color'
import { Position } from '@/core/Position'

export function setPiecesAtPositions(
  board: Board,
  PieceClass: new (color: Color, position: Position) => Piece,
  color: Color,
  list: ChessPosition[],
) {
  for (const pos of list) {
    const position = new Position(pos)
    const piece = new PieceClass(color, position)
    board.setPieceAt(position, piece)
  }
}
