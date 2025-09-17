import type { MoveStrategy } from '@/core/moves/MoveStrategy'
import type { Position } from '@/core/Position'
import type { Piece } from '@/pieces/Piece'
import type { IBoard } from '@/types/interfaces/IBoard'
import type { MoveOptions } from '@/types/move'
import type { PieceMemento } from '@/types/piece'

export class MoveCommand {
  public pieceMemento: PieceMemento
  public rookMemento?: PieceMemento

  constructor(
    public piece: Piece,
    public from: Position,
    public to: Position,
    private strategy: MoveStrategy,
    public options?: MoveOptions,
  ) {
    this.pieceMemento = piece.createMemento()

    if (options?.castle)
      this.rookMemento = options.castle.rookPiece.createMemento()
  }

  execute(board: IBoard) {
    this.strategy.execute(this, board)
  }

  undo(board: IBoard) {
    this.piece.restoreMemento(this.pieceMemento)

    if (this.rookMemento && this.options?.castle?.rookPiece) {
      this.options?.castle?.rookPiece.restoreMemento(this.rookMemento)
    }

    this.strategy.undo(this, board)
  }
}
