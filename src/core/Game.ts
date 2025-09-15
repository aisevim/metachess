import type { Move } from './Move'
import type { Position } from '@/core/Position'
import type { Grid } from '@/types/board'
import type { Color } from '@/types/color'
import type { IBoard } from '@/types/interfaces/IBoard'
import { PieceFactory } from '@/core/PieceFactory'

export class Game {
  private board: IBoard
  private currentTurn: Color
  private history: Move[] = []

  constructor(board: IBoard) {
    this.board = board
    this.currentTurn = 'white'
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

    this.handleSpecialMove(move)
    move.execute(this.board)
    this.history.push(move)
    this.switchTurn()
  }

  private handleSpecialMove(move: Move) {
    if (move.options?.type === 'promotion') {
      this.handlePromotion(move)
    }
  }

  private handlePromotion(move: Move) {
    // Ask the type of promotion
    const piece = PieceFactory.createPromotionPiece('queen', move.piece.color, move.piece.position)
    move.options.promotionPiece = piece
  }

  // à revoir
  public getBoardSnapshot(): Grid {
    return this.board.toSnapshot().map(row => [...row])
  }
}
