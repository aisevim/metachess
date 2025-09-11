import type { ChessPosition } from '@/core/Position'
import { Game } from '@/core/Game'
import { Player } from '@/core/Player'
import { Position } from '@/core/Position'

export function createGame() {
  const player1 = new Player()
  const player2 = new Player()
  const game = new Game(player1, player2)

  return game
}

export function executeMoves(game: Game, moves: [ChessPosition, ChessPosition][]) {
  moves.forEach(([from, to]) => game.executeMove(new Position(from), new Position(to)))
}
