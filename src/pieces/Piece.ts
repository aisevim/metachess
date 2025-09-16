import type { MoveCommand } from '@/core/MoveCommand'
import type { Position } from '@/core/Position'
import type { Color } from '@/types/color'
import type { IBoard } from '@/types/interfaces/IBoard'
import type { LegalMoveContext, PieceMemento } from '@/types/piece'

export abstract class Piece {
  abstract type: string

  constructor(
    public color: Color,
    public position: Position,
    public hasMoved: boolean = false,
  ) {}

  public abstract getLegalMoves(board: IBoard, context?: LegalMoveContext): MoveCommand[]

  public moveTo(position: Position) {
    this.position = position
    this.hasMoved = true
  }

  public createMemento(): PieceMemento {
    return {
      position: this.position.clone(),
      hasMoved: this.hasMoved,
    }
  }

  public restoreMemento(memento: PieceMemento) {
    this.position = memento.position.clone()
    this.hasMoved = memento.hasMoved
  }

  public isEnemy(other: Piece | null): boolean {
    return other?.color !== this.color
  }
}
