import type { PieceType } from '@/engine/pieces/enums/PieceType'
import type { ChessPosition } from '@/engine/types/position'
import { AttackMapFactory } from '@/engine/attack/AttackMapFactory'
import { AttackMapManager } from '@/engine/attack/AttackMapManager'
import { BoardFactory } from '@/engine/board/BoardFactory'
import { Position } from '@/engine/board/Position'
import { Game } from '@/engine/game/Game'

export function createGame() {
  const board = BoardFactory.standard()
  const factory = new AttackMapFactory()
  const attackMapManager = new AttackMapManager(board, factory)
  const game = new Game(board, attackMapManager)

  return game
}

export function executeMoves(game: Game, moves: [ChessPosition, ChessPosition, PieceType?][]) {
  moves.forEach(([from, to, type]) => game.executeMove(new Position(from), new Position(to), type))
}
