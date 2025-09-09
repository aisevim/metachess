import { SlidingPiece } from '../pieces/SlidingPiece'

export class Bishop extends SlidingPiece {
  DIRECTIONS = [
    { dx: 1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: -1 },
  ]
}
