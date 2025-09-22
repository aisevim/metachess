import type { IBoard } from '@/board/IBoard'
import type { Position } from '@/board/Position'
import type { MoveExecutor } from '@/moves/execution/MoveExecutor'
import type { Piece } from '@/pieces/Piece'
import type { PieceMemento } from '@/types/piece'

interface MoveOptions {
  capturedPiece?: Piece | null
  promotionPiece?: Piece | null
  castle?: {
    rookPiece: Piece
    rookNewPosition: Position
  }
}

export class MoveCommand {
  public pieceMemento: PieceMemento
  public rookMemento?: PieceMemento

  constructor(
    public piece: Piece,
    public from: Position,
    public to: Position,
    public executor: MoveExecutor,
    public options?: MoveOptions,
  ) {
    this.pieceMemento = piece.createMemento()

    if (options?.castle)
      this.rookMemento = options.castle.rookPiece.createMemento()
  }

  execute(board: IBoard) {
    this.executor.execute(this, board)
  }

  undo(board: IBoard) {
    this.piece.restoreMemento(this.pieceMemento)

    if (this.rookMemento && this.options?.castle?.rookPiece) {
      this.options?.castle?.rookPiece.restoreMemento(this.rookMemento)
    }

    this.executor.undo(this, board)
  }
}
