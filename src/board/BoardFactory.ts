import type { IBoard } from '@/board/IBoard'
import { Board } from '@/board/Board'
import { Position } from '@/board/Position'
import { Bishop } from '@/pieces/types/Bishop'
import { King } from '@/pieces/types/King'
import { Knight } from '@/pieces/types/Knight'
import { Pawn } from '@/pieces/types/Pawn'
import { Queen } from '@/pieces/types/Queen'
import { Rook } from '@/pieces/types/Rook'

export class BoardFactory {
  public static empty(): IBoard {
    return new Board()
  }

  public static standard(): IBoard {
    const board = new Board()
    const backRank = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]

    for (let x = 0; x < board.size; x++) {
      board.setPieceAt(new Position(x, 0), new backRank[x]('white', new Position(x, 0)))
      board.setPieceAt(new Position(x, 1), new Pawn('white', new Position(x, 1)))

      board.setPieceAt(new Position(x, 6), new Pawn('black', new Position(x, 6)))
      board.setPieceAt(new Position(x, 7), new backRank[x]('black', new Position(x, 7)))
    }

    return board
  }
}
