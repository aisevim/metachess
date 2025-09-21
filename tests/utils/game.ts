import type { ChessPosition } from '@/types/position'
import { AttackMapFactory } from '@/attack/AttackMapFactory'
import { AttackMapManager } from '@/attack/AttackMapManager'
import { BoardFactory } from '@/board/BoardFactory'
import { Position } from '@/board/Position'
import { Game } from '@/game/Game'

export function createGame() {
  const board = BoardFactory.standard()
  const factory = new AttackMapFactory()
  const attackMapManager = new AttackMapManager(board, factory)
  const game = new Game(board, attackMapManager)

  return game
}

export function executeMoves(game: Game, moves: [ChessPosition, ChessPosition][]) {
  moves.forEach(([from, to]) => game.executeMove(new Position(from), new Position(to)))
}
