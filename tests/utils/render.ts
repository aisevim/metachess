import type { Piece } from '@/pieces/Piece'

export function pieceSymbol(piece: any): string {
  const symbols: Record<string, string> = {
    Pawn: piece.color != 'white' ? '♙' : '♟',
    Rook: piece.color != 'white' ? '♖' : '♜',
    Knight: piece.color != 'white' ? '♘' : '♞',
    Bishop: piece.color != 'white' ? '♗' : '♝',
    Queen: piece.color != 'white' ? '♕' : '♛',
    King: piece.color != 'white' ? '♔' : '♚',
  }

  return symbols[piece.constructor.name] || '❓'
}

export function renderGrid(grid: (Piece | null)[][]): string {
  const size = grid.length
  let output = '\n'

  for (let y = size - 1; y >= 0; y--) {
    output += `${y + 1} `
    for (let x = 0; x < size; x++) {
      const piece = grid[y][x]
      output += piece ? pieceSymbol(piece) : '⬚'
      output += ' '
    }
    output += '\n'
  }

  output += '  '
  for (let x = 0; x < size; x++) {
    output += `${String.fromCharCode(97 + x)} `
  }
  output += '\n'

  return output
}
