import type { ChessPosition } from '@/types/position'
import { BoardFactory } from '@/core/BoardFactory'
import { Game } from '@/core/Game'
import { Position } from '@/core/Position'

export function createGame() {
  const board = BoardFactory.standard()
  const game = new Game(board)

  return game
}

export function executeMoves(game: Game, moves: [ChessPosition, ChessPosition][]) {
  moves.forEach(([from, to]) => game.executeMove(new Position(from), new Position(to)))
}
