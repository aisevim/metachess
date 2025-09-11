import type { Position } from '@/core/Position'
import type { Piece } from '@/pieces/Piece'

export class Board {
  public static readonly SIZE = 8
  private grid: (Piece | null)[][]

  constructor() {
    this.grid = this.createEmptyBoard()
  }

  private createEmptyBoard() {
    return Array.from({ length: Board.SIZE }, () => Array.from<Piece | null>({ length: Board.SIZE }).fill(null))
  }

  getPieceAt(pos: Position) {
    return this.grid[pos.y][pos.x]
  }

  setPieceAt(pos: Position, piece: Piece) {
    this.grid[pos.y][pos.x] = piece
  }

  removePieceAt(pos: Position) {
    this.grid[pos.y][pos.x] = null
  }

  toSnapshot() {
    return this.grid.map(row => [...row])
  }

  isInside(pos: Position) {
    return (
      pos.x >= 0
      && pos.y >= 0
      && pos.x < Board.SIZE
      && pos.y < Board.SIZE
    )
  }
}
