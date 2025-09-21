import type { MoveCommand } from '@/moves/MoveCommand'
import type { Piece } from '@/pieces/Piece'

export interface MoveGenerator {
  getLegalMoves: (piece: Piece) => MoveCommand[]
}
