import type { IBoard } from '@/core/IBoard'
import type { Move } from '@/core/Move'
import type { Position } from '@/core/Position'
import type { Color } from '@/types/Color'

export abstract class Piece {
  constructor(
    public color: Color,
    public position: Position,
    public hasMoved: boolean = false,
  ) {}

  public abstract getLegalMoves(board: IBoard): Move[]

  public moveTo(position: Position) {
    this.position = position
    this.hasMoved = true
  }

  public isEnemy(other: Piece | null): boolean {
    return other?.color !== this.color
  }
}
