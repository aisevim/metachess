export type ChessPosition = `${'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`

export class Position {
  public x: number;
  public y: number;

  constructor(x: number, y: number);
  constructor(pos: ChessPosition);
  constructor(a: number | ChessPosition, b?: number) {
    if (typeof a === 'string') {
      const { x, y } = this.toNumeric(a);
      this.x = x;
      this.y = y;
    } else {
      this.x = a;
      this.y = b!;
    }
  }

  clone() {
    return new Position(this.x, this.y)
  }

  equals(other: Position) {
    return this.x === other.x && this.y === other.y
  }

  toAlgebraic(position: Position) {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    return `${files[position.x]}${position.y + 1}` as ChessPosition
  }

  toNumeric(position: ChessPosition) {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    return {
      x: files.indexOf(position[0]),
      y: Number.parseInt(position[1]) - 1,
    }
  }
}
