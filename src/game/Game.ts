import type { AttackMapManager } from '@/attack/AttackMapManager'
import type { IBoard } from '@/board/IBoard'
import type { Position } from '@/board/Position'
import type { MoveCommand } from '@/moves/MoveCommand'
import type { Grid } from '@/types/board'
import { RulesEngine } from '@/game/RulesEngine'
import { PromotionMoveExecutor } from '@/moves/execution/PromotionMoveExecutor'
import { PieceType } from '@/pieces/enums/PieceType'
import { Color } from '@/types/enums/color'

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

  executeMove(from: Position, to: Position) {
    const piece = this.board.getPieceAt(from)
    if (!piece)
      throw new Error('No piece at the source position')
    if (piece.color !== this.currentTurn)
      throw new Error('Not your turn')

    const legalMoves = this.rulesEngine.getLegalMoves(piece)
    const matchingMoves = legalMoves.filter(m => m.to.equals(to))

    if (matchingMoves.length === 0)
      throw new Error('Illegal move')

    const move = this.choosePromotionMoveIfNeeded(matchingMoves)
    move.execute(this.board)
    this.history.push(move)
    this.attackMapManager.recomputeAll()
    this.switchTurn()
  }

  private choosePromotionMoveIfNeeded(moves: MoveCommand[]): MoveCommand {
    if (moves.length === 1)
      return moves[0]

    const promotionMove = moves.find(
      m => m.executor instanceof PromotionMoveExecutor && m.options?.promotionPiece?.type === PieceType.Queen,
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
