import type { AttackMapManager } from '@/engine/attack/AttackMapManager'
import type { IBoard } from '@/engine/board/IBoard'
import type { Position } from '@/engine/board/Position'
import type { MoveCommand } from '@/engine/moves/MoveCommand'
import type { PieceType } from '@/engine/pieces/enums/PieceType'
import type { Grid } from '@/engine/types/board'
import { RulesEngine } from '@/engine/game/RulesEngine'
import { PromotionMoveExecutor } from '@/engine/moves/execution/PromotionMoveExecutor'
import { PieceType } from '@/engine/pieces/enums/PieceType'
import { Color } from '@/engine/types/enums/color'

export class Game {
  private rulesEngine: RulesEngine
  private currentTurn: Color
  private history: MoveCommand[] = []

  constructor(private board: IBoard, private attackMapManager: AttackMapManager) {
    this.rulesEngine = new RulesEngine(this.board, this.attackMapManager, this.history)
    this.currentTurn = Color.White
  }

  switchTurn() {
    this.currentTurn = this.currentTurn === Color.White ? Color.Black : Color.White
  }

  executeMove(from: Position, to: Position, promotion?: PieceType) {
    const piece = this.board.getPieceAt(from)
    if (!piece)
      throw new Error('No piece at the source position')
    if (piece.color !== this.currentTurn)
      throw new Error('Not your turn')

    const legalMoves = this.rulesEngine.getLegalMoves(piece)
    const matchingMoves = legalMoves.filter(m => m.to.equals(to))

    if (matchingMoves.length === 0)
      throw new Error('Illegal move')

    const move = this.choosePromotionMoveIfNeeded(matchingMoves, promotion)
    move.execute(this.board)
    this.history.push(move)
    this.attackMapManager.recomputeAll()
    this.switchTurn()
  }

  private choosePromotionMoveIfNeeded(moves: MoveCommand[], promotion?: PieceType): MoveCommand {
    if (moves.length === 1)
      return moves[0]

    const promotionMove = moves.find(
      m => m.executor instanceof PromotionMoveExecutor && m.options?.promotionPiece?.type === promotion,
    )
    if (!promotionMove)
      throw new Error('No valid promotion move found')
    return promotionMove
  }

  undoMove() {
    const lastMove = this.history.pop()
    if (!lastMove)
      throw new Error('No moves to undo')

    lastMove.undo(this.board)
    this.attackMapManager.recomputeAll()
    this.switchTurn()
  }

  // à revoir
  public getBoardSnapshot(): Grid {
    return this.board.toSnapshot().map(row => [...row])
  }
}
