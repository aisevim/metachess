import type { AttackMap } from '@/engine/attack/AttackMap'
import type { AttackMapFactory } from '@/engine/attack/AttackMapFactory'
import type { IBoard } from '@/engine/board/IBoard'
import type { Position } from '@/engine/board/Position'
import type { MoveCommand } from '@/engine/moves/MoveCommand'
import type { Piece } from '@/engine/pieces/Piece'
import type { Color } from '@/engine/types/enums/color'

export class AttackMapManager {
  private maps: Map<Piece, AttackMap> = new Map()

  constructor(private board: IBoard, private factory: AttackMapFactory) {
    this.recomputeAll()
  }

  public updatePieceMap(piece: Piece) {
    const attackMap = this.factory.create(piece)
    this.maps.set(piece, attackMap)
  }

  public getAttackMoves(piece: Piece): MoveCommand[] {
    const map = this.maps.get(piece)
    if (!map)
      return []
    return map.getAttackMoves(piece, this.board)
  }

  public isSquareAttacked(pos: Position, enemyColor: Color): boolean {
    return this.getAllAttackMovesBy(enemyColor).some(move => move.to.equals(pos))
  }

  public getAllAttackMovesBy(color: Color): MoveCommand[] {
    const moves: MoveCommand[] = []

    for (const [piece, map] of this.maps.entries()) {
      if (piece.color !== color)
        continue

      moves.push(...map.getAttackMoves(piece, this.board))
    }

    return moves
  }

  public recomputeAll() {
    this.maps.clear()
    for (const piece of this.board.getAllPieces()) {
      this.maps.set(piece, this.factory.create(piece))
    }
  }
}
