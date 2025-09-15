import type { Move } from '@/core/Move'
import type { Position } from '@/core/Position'
import type { Color } from '@/types/color'
import type { IBoard } from '@/types/interfaces/IBoard'
import type { LegalMoveContext } from '@/types/piece'

export abstract class Piece {
  abstract type: string

  constructor(
    public color: Color,
    public position: Position,
    public hasMoved: boolean = false,
  ) {}

  public abstract getLegalMoves(board: IBoard, context?: LegalMoveContext): Move[]

  public moveTo(position: Position) {
    this.position = position
    this.hasMoved = true
  }

  public isEnemy(other: Piece | null): boolean {
    return other?.color !== this.color
  }
}
