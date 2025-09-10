import { SlidingPiece } from '@/pieces/SlidingPiece'

export class Bishop extends SlidingPiece {
  protected static override readonly DIRECTIONS = [
    { dx: 1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: -1 },
  ]
}
