import type { IBoard } from '@/board/IBoard'
import type { MoveCommand } from '@/moves/MoveCommand'
import type { Piece } from '@/pieces/Piece'

export interface AttackMap {
  getAttackMoves: (piece: Piece, board: IBoard) => MoveCommand[]
}
