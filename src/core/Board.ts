import type { Piece } from '../pieces/Piece'
import type { Position } from './Position'

export class Board {
  private grid: (Piece | null)[][]

  constructor() {
    this.grid = this.createEmptyBoard()
  }

  private createEmptyBoard() {
    return Array.from({ length: 8 }, () => Array.from<Piece | null>({ length: 8 }).fill(null))
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

  isOutsideBoard(from: Position, to: Position) {
    return !from.isInsideBoard() || !to.isInsideBoard()
  }
}
