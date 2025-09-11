import type { Piece } from '@/pieces/Piece'

function pieceSymbol(piece: Piece): string {
  const symbols: Record<string, string> = {
    Pawn: piece.color === 'white' ? '♙' : '♟',
    Rook: piece.color === 'white' ? '♖' : '♜',
    Knight: piece.color === 'white' ? '♘' : '♞',
    Bishop: piece.color === 'white' ? '♗' : '♝',
    Queen: piece.color === 'white' ? '♕' : '♛',
    King: piece.color === 'white' ? '♔' : '♚',
  }

  return symbols[piece.constructor.name] || '❓'
}

function alphaNumericSymbol(letter: string) {
  const code = letter.toLowerCase().charCodeAt(0) - 97
  return String.fromCharCode(0x24D0 + code)
}

export function renderGrid(grid: (Piece | null)[][]) {
  const size = grid.length
  const cellWidth = 2
  let output = '\n'

  for (let y = size - 1; y >= 0; y--) {
    output += `${(y + 1).toString().padEnd(2, ' ')}  `
    for (let x = 0; x < size; x++) {
      const piece = grid[y][x]
      const symbol = piece ? pieceSymbol(piece) : '﹣'

      output += symbol.padEnd(cellWidth, ' ')
    }
    output += '\n'
  }

  output += '\n    '
  for (let x = 0; x < size; x++) {
    const letter = String.fromCharCode(97 + x)
    output += alphaNumericSymbol(letter).padEnd(cellWidth, ' ')
  }
  output += '\n'

  return output
}
