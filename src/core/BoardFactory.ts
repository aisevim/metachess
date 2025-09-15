import type { IBoard } from '@/types/interfaces/IBoard'
import { Board } from '@/core/Board'
import { Position } from '@/core/Position'
import { Bishop } from '@/pieces/Bishop'
import { King } from '@/pieces/King'
import { Knight } from '@/pieces/Knight'
import { Pawn } from '@/pieces/Pawn'
import { Queen } from '@/pieces/Queen'
import { Rook } from '@/pieces/Rook'

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
