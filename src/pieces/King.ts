import { SteppingPiece } from '@/pieces/SteppingPiece'

export class King extends SteppingPiece {
  readonly type = 'king'
  protected readonly OFFSETS = [
    { dx: 1, dy: 0 },
    { dx: 1, dy: 1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: -1, dy: -1 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: -1 },
  ]
}
