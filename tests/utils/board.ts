import type { Board } from '@/board/Board'
import type { Piece } from '@/pieces/Piece'
import type { Color } from '@/types/enums/color'
import type { ChessPosition } from '@/types/position'
import { Position } from '@/board/Position'

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
