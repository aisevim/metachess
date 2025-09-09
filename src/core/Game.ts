import type { Color } from '../types/Color'
import type { Player } from './Player'
import { Pawn } from '../pieces/Pawn'
import { Piece } from '../pieces/Piece'
import { Board } from './Board'
import { Move } from './Move'
import { Position } from './Position'

export class Game {
  private board: Board
  private players: Player[]
  private currentTurn: Color
  private targetEnPassant: Position | null = null

  constructor(player1: Player, player2: Player) {
    this.board = new Board()
    this.players = [player1, player2]
    this.currentTurn = 'white'
  }

  switchTurn() {
    this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white'
  }

  executeMove(from: Position, to: Position) {
    const piece = this.board.getPieceAt(from)
    if (!piece) throw new Error('No piece at the source position')
    if (piece.color !== this.currentTurn) throw new Error('Not your turn')

    const legalMoves = this.getLegalMovesFor(piece)
    const move = legalMoves.find(m => m.to.equals(to))

    if (!move) throw new Error('Illegal move')
    
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
        ...this.getPromotionMoves(piece, piece.position)
      ]
    }

    return moves
  }

  private getEnPassantMoves(piece: Piece) {
    const moves: Move[] = []
    if (!this.targetEnPassant) return moves;

    const { x, y } = piece.position
    const direction = this.currentTurn === 'white' ? 1 : -1;

    [1, -1].forEach(xd => {
      const capturedPiece = this.board.getPieceAt(this.targetEnPassant!);

      if (piece.isEnemy(capturedPiece)) {
        const newPosition = new Position(x + xd, y + direction);
        moves.push(new Move(piece, newPosition, { capturedPiece }));
      }
    });

    return moves
  }

  private updateTargetEnPassant(piece: Piece, from: Position, to: Position) {
    if(piece.constructor.name === "Pawn" && !piece.hasMoved) {
      const isDoubleForward = Math.abs(to.y - from.y) === 2
      this.targetEnPassant = isDoubleForward ? to : null
    } else {
      this.targetEnPassant = null
    }
  }

  private getPromotionMoves(piece: Piece, to: Position) {
    const moves: Move[] = []
    if (!(piece instanceof Pawn)) return moves

    const promotionRank = piece.color === 'white' ? 7 : 0

    if (to.y === promotionRank) {
      // TODO: allow player choice
      const promoted = new Pawn(piece.color, to)
      moves.push(new Move(promoted, to, { capturedPiece: this.board.getPieceAt(to) }))
    }

    return moves
  }
}
