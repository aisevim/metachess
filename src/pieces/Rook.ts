import { SlidingPiece } from '@/pieces/SlidingPiece'

export class Rook extends SlidingPiece {
  readonly type = 'rook'
  protected readonly DIRECTIONS = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
  ]
}
