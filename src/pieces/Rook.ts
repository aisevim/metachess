import { SlidingPiece } from './SlidingPiece'

export class Rook extends SlidingPiece {
  DIRECTIONS = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
  ]
}
