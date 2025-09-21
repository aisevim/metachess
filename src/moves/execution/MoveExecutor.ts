import type { IBoard } from '@/board/IBoard'
import type { MoveCommand } from '@/moves/MoveCommand'

export interface MoveExecutor {
  execute: (move: MoveCommand, board: IBoard) => void
  undo: (move: MoveCommand, board: IBoard) => void
}
