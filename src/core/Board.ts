import type { Position } from '@/core/Position'
import type { Piece } from '@/pieces/Piece'
import type { Grid } from '@/types/board'
import type { IBoard } from '@/types/interfaces/IBoard'

export class Board implements IBoard {
  public readonly size = 8
  private grid: Grid

  constructor() {
    this.grid = this.createEmptyBoard()
  }

  private createEmptyBoard(): Grid {
    return Array.from({ length: this.size }, () => Array.from<Piece | null>({ length: this.size }).fill(null))
  }

  getPieceAt(pos: Position): Piece | null {
    return this.grid[pos.y][pos.x]
  }

  setPieceAt(pos: Position, piece: Piece) {
    this.grid[pos.y][pos.x] = piece
  }

  removePieceAt(pos: Position) {
    this.grid[pos.y][pos.x] = null
  }

  toSnapshot(): Grid {
    return this.grid.map(row => [...row])
  }

  isInside(pos: Position): boolean {
    return (
      pos.x >= 0
      && pos.y >= 0
      && pos.x < this.size
      && pos.y < this.size
    )
  }
}
