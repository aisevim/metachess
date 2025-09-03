import { Piece } from "../pieces/Piece"

export interface MoveOptions {
  capture?: boolean
  enPassant?: boolean
  capturedPiece?: Piece | null
}
