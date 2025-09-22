import type { IBoard } from '@/engine/board/IBoard'
import type { MoveCommand } from '@/engine/moves/MoveCommand'

export interface MoveExecutor {
  execute: (move: MoveCommand, board: IBoard) => void
  undo: (move: MoveCommand, board: IBoard) => void
}
