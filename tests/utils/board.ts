import type { Board } from '@/engine/board/Board'
import type { Piece } from '@/engine/pieces/Piece'
import type { Color } from '@/engine/types/enums/color'
import type { ChessPosition } from '@/engine/types/position'
import { Position } from '@/engine/board/Position'

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
