import { SteppingPiece } from '@/pieces/SteppingPiece'

export class Knight extends SteppingPiece {
  protected readonly OFFSETS = [
    { dx: 1, dy: 2 },
    { dx: 2, dy: 1 },
    { dx: 2, dy: -1 },
    { dx: 1, dy: -2 },
    { dx: -1, dy: -2 },
    { dx: -2, dy: -1 },
    { dx: -2, dy: 1 },
    { dx: -1, dy: 2 },
  ]
}
