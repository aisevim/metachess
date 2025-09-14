import type { Move } from './Move'
import type { Grid } from '@/types/board'
import type { Color } from '@/types/color'
import type { IBoard } from '@/types/interfaces/IBoard'
import { Bishop } from '@/pieces/Bishop'
import { King } from '@/pieces/King'
import { Knight } from '@/pieces/Knight'
import { Pawn } from '@/pieces/Pawn'
import { Queen } from '@/pieces/Queen'
import { Rook } from '@/pieces/Rook'
import { Position } from '../core/Position'

export class Game {
  private board: IBoard
  private currentTurn: Color
  private history: Move[] = []

  constructor(board: IBoard) {
    this.board = board
    this.currentTurn = 'white'
    this.initializeBoard()
  }

  initializeBoard() {
    const backRank = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]

    for (let x = 0; x < this.board.size; x++) {
      this.board.setPieceAt(new Position(x, 0), new backRank[x]('white', new Position(x, 0)))
      this.board.setPieceAt(new Position(x, 1), new Pawn('white', new Position(x, 1)))
      this.board.setPieceAt(new Position(x, 6), new Pawn('black', new Position(x, 6)))
      this.board.setPieceAt(new Position(x, 7), new backRank[x]('black', new Position(x, 7)))
    }
  }

  switchTurn() {
    this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white'
  }

  executeMove(from: Position, to: Position) {
    const piece = this.board.getPieceAt(from)
    if (!piece)
      throw new Error('No piece at the source position')
    if (piece.color !== this.currentTurn)
      throw new Error('Not your turn')

    const legalMoves = piece.getLegalMoves(this.board, { history: this.history })
    const move = legalMoves.find(m => m.to.equals(to))

    if (!move)
      throw new Error('Illegal move')

    move.execute(this.board)
    this.history.push(move)
    this.switchTurn()
  }

  // à revoir
  public getBoardSnapshot(): Grid {
    return this.board.toSnapshot().map(row => [...row])
  }
}
