import type { AttackMapManager } from '@/attack/AttackMapManager'
import type { IBoard } from '@/board/IBoard'
import type { Position } from '@/board/Position'
import type { MoveCommand } from '@/moves/MoveCommand'
import type { Grid } from '@/types/board'
import type { Color } from '@/types/color'
import { RulesEngine } from '@/game/RulesEngine'
import { PromotionMoveExecutor } from '@/moves/execution/PromotionMoveExecutor'
import { PieceType } from '@/pieces/enums/PieceType'
import { PieceFactory } from '@/pieces/PieceFactory'

export class Game {
  private rulesEngine: RulesEngine
  private currentTurn: Color
  private history: MoveCommand[] = []

  constructor(private board: IBoard, private attackMapManager: AttackMapManager) {
    this.rulesEngine = new RulesEngine(this.board, this.attackMapManager, this.history)
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

    const legalMoves = this.rulesEngine.getLegalMoves(piece)
    const move = legalMoves.find(m => m.to.equals(to))

    if (!move)
      throw new Error('Illegal move')

    this.handleSpecialMove(move)
    move.execute(this.board)
    this.history.push(move)
    this.attackMapManager.recomputeAll()
    this.switchTurn()
  }

  undoMove() {
    const lastMove = this.history.pop()
    if (!lastMove)
      throw new Error('No moves to undo')

    lastMove.undo(this.board)
    this.attackMapManager.recomputeAll()
    this.switchTurn()
  }

  private handleSpecialMove(move: MoveCommand) {
    if (move.strategy instanceof PromotionMoveExecutor) {
      this.handlePromotion(move)
    }
  }

  private handlePromotion(move: MoveCommand) {
    if (!move.options)
      return
    // Ask the type of promotion
    const piece = PieceFactory.createPromotionPiece(PieceType.Queen, move.piece.color, move.piece.position)
    move.options.promotionPiece = piece
  }

  // à revoir
  public getBoardSnapshot(): Grid {
    return this.board.toSnapshot().map(row => [...row])
  }
}
