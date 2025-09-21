import type { MovementType } from '@/moves/enums/MovementType'
import type { PieceType } from '@/pieces/enums/PieceType'
import type { Color } from '@/types/color'
import type { PieceMemento } from '@/types/piece'
import { Position } from '@/board/Position'

interface PieceOffsets {
  dx: number
  dy: number
}

export abstract class Piece {
  abstract type: PieceType
  abstract movementType: MovementType
  abstract offsets: PieceOffsets[]

  constructor(
    public color: Color,
    public position: Position,
    public hasMoved: boolean = false,
  ) {}

  public moveTo(position: Position) {
    this.position = position
    this.hasMoved = true
  }

  public offsetsToPositions(): Position[] {
    return this.offsets.map(offset =>
      new Position(this.position.x + offset.dx, this.position.y + offset.dy),
    )
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
