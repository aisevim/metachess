import type { IBoard } from '@/engine/board/IBoard'
import type { MoveCommand } from '@/engine/moves/MoveCommand'
import type { Piece } from '@/engine/pieces/Piece'

export interface AttackMap {
  getAttackMoves: (piece: Piece, board: IBoard) => MoveCommand[]
}
