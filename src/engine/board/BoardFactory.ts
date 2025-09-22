import type { IBoard } from '@/engine/board/IBoard'
import { Board } from '@/engine/board/Board'
import { Position } from '@/engine/board/Position'
import { Bishop } from '@/engine/pieces/types/Bishop'
import { King } from '@/engine/pieces/types/King'
import { Knight } from '@/engine/pieces/types/Knight'
import { Pawn } from '@/engine/pieces/types/Pawn'
import { Queen } from '@/engine/pieces/types/Queen'
import { Rook } from '@/engine/pieces/types/Rook'
import { Color } from '@/engine/types/enums/color'

export class BoardFactory {
  public static empty(): IBoard {
    return new Board()
  }

  public static standard(): IBoard {
    const board = new Board()
    const backRank = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]

    for (let x = 0; x < board.size; x++) {
      board.setPieceAt(new Position(x, 0), new backRank[x](Color.White, new Position(x, 0)))
      board.setPieceAt(new Position(x, 1), new Pawn(Color.White, new Position(x, 1)))

      board.setPieceAt(new Position(x, 6), new Pawn(Color.Black, new Position(x, 6)))
      board.setPieceAt(new Position(x, 7), new backRank[x](Color.Black, new Position(x, 7)))
    }

    return board
  }
}
