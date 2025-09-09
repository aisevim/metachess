import { SlidingPiece } from '../pieces/SlidingPiece'

export class Bishop extends SlidingPiece {
  directions = [
    { dx: 1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: -1 },
  ]
}
