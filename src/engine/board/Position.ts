import type { ChessPosition } from '@/engine/types/position'

export class Position {
  public x: number
  public y: number

  constructor(x: number, y: number)
  constructor(pos: ChessPosition)
  constructor(a: number | ChessPosition, b?: number) {
    if (typeof a === 'string') {
      const { x, y } = Position.fromAlgebraic(a)
      this.x = x
      this.y = y
    }
    else {
      this.x = a
      this.y = b!
    }
  }

  clone(): Position {
    return new Position(this.x, this.y)
  }

  equals(other: Position): boolean {
    return this.x === other.x && this.y === other.y
  }

  toChessPosition(): ChessPosition {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    return `${files[this.x]}${this.y + 1}` as ChessPosition
  }

  static fromAlgebraic(pos: ChessPosition): { x: number, y: number } {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    return {
      x: files.indexOf(pos[0]),
      y: Number.parseInt(pos[1], 10) - 1,
    }
  }
}
