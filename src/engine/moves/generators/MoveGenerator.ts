import type { MoveCommand } from '@/engine/moves/MoveCommand'
import type { Piece } from '@/engine/pieces/Piece'

export interface MoveGenerator {
  getLegalMoves: (piece: Piece) => MoveCommand[]
}
