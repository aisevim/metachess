import type { MoveCommand } from '@/core/MoveCommand'
import type { IBoard } from '@/types/interfaces/IBoard'

export interface MoveStrategy {
  execute: (move: MoveCommand, board: IBoard) => void
  undo: (move: MoveCommand, board: IBoard) => void
}
