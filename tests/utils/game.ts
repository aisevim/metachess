import type { ChessPosition } from '@/core/Position'
import { Board } from '@/core/Board'
import { Game } from '@/core/Game'
import { Position } from '@/core/Position'

export function createGame() {
  const board = new Board()
  const game = new Game(board)

  return game
}

export function executeMoves(game: Game, moves: [ChessPosition, ChessPosition][]) {
  moves.forEach(([from, to]) => game.executeMove(new Position(from), new Position(to)))
}
