export type ChessPosition = `${'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`

export class Position {
  constructor(
    public x: number,
    public y: number,
  ) {}

  isInsideBoard() {
    return this.x >= 0 && this.x < 8 && this.y >= 0 && this.y < 8
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

  static toNumeric(position: ChessPosition) {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    return {
      x: files.indexOf(position[0]),
      y: Number.parseInt(position[1]) - 1,
    }
  }
}
