import type { Player } from '@/core/Player'
import type { Piece } from '@/pieces/Piece'
import type { Color } from '@/types/Color'
import { Board } from '@/core/Board'
import { Move } from '@/core/Move'
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
  private targetEnPassant: Position | null = null

  constructor(board: IBoard) {
    this.board = board
    this.currentTurn = 'white'
    this.initializeBoard()
  }

  initializeBoard(): void {
    const backRank = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook]

    for (let x = 0; x < Board.SIZE; x++) {
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

    const legalMoves = this.getLegalMovesFor(piece)
    const move = legalMoves.find(m => m.to.equals(to))

    if (!move)
      throw new Error('Illegal move')

    this.updateTargetEnPassant(piece, from, to)
    move.execute(this.board)
    this.switchTurn()
  }

  private getLegalMovesFor(piece: Piece): Move[] {
    let moves = piece.getLegalMoves(this.board)

    if (piece instanceof Pawn) {
      moves = [
        ...moves,
        ...this.getEnPassantMoves(piece),
        ...this.getPromotionMoves(piece, piece.position),
      ]
    }

    return moves
  }

  private getEnPassantMoves(piece: Piece) {
    const moves: Move[] = []
    if (!this.targetEnPassant)
      return moves

    const { x, y } = piece.position
    const direction = this.currentTurn === 'white' ? 1 : -1

    const target = this.board.getPieceAt(this.targetEnPassant)
    const isNotAtSide = !target || Math.abs(target.position.x - x) !== 1 || target.position.y !== y

    if (!piece.isEnemy(target) || isNotAtSide)
      return moves

    const newPosition = new Position(target.position.x, y + direction)
    moves.push(new Move(piece, newPosition, { capturedPiece: target }))

    return moves
  }

  private updateTargetEnPassant(piece: Piece, from: Position, to: Position) {
    if (piece.constructor.name === 'Pawn' && !piece.hasMoved) {
      const isDoubleForward = Math.abs(to.y - from.y) === 2
      this.targetEnPassant = isDoubleForward ? to : null
    }
    else {
      this.targetEnPassant = null
    }
  }

  private getPromotionMoves(piece: Piece, to: Position) {
    const moves: Move[] = []
    if (!(piece instanceof Pawn))
      return moves

    const promotionRank = piece.color === 'white' ? 7 : 0

    if (to.y === promotionRank) {
      // TODO: allow player choice
      const promoted = new Pawn(piece.color, to)
      moves.push(new Move(promoted, to, { capturedPiece: this.board.getPieceAt(to) }))
    }

    return moves
  }

  // à revoir
  public getBoardSnapshot(): (Piece | null)[][] {
    return this.board.toSnapshot().map(row => [...row])
  }
}
