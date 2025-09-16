import type { MoveCommand } from '@/core/MoveCommand'
import type { Piece } from '@/pieces/Piece'

function pieceSymbol(piece: Piece): string {
  const symbols: Record<string, { white: string, black: string }> = {
    Pawn: { white: '♟', black: '♙' },
    Rook: { white: '♜', black: '♖' },
    Knight: { white: '♞', black: '♘' },
    Bishop: { white: '♝', black: '♗' },
    Queen: { white: '♛', black: '♕' },
    King: { white: '♚', black: '♔' },
    PieceMock: { white: '◉', black: '☉' },
  }

  const name = piece.constructor.name
  const colorKey = piece.color === 'black' ? 'black' : 'white'
  return symbols[name]?.[colorKey] ?? '?'
}

export function renderGrid(grid: (Piece | null)[][], moves?: MoveCommand[]): string {
  const size = grid.length
  const cellWidth = 2
  const gap = '     '
  let output = '\n'
  const showMoves = moves && moves.length > 0

  for (let y = size - 1; y >= 0; y--) {
    let line = `${(y + 1).toString().padEnd(2, ' ')} `

    for (let x = 0; x < size; x++) {
      const piece = grid[y][x]
      line += (piece ? pieceSymbol(piece) : '-').padEnd(cellWidth, ' ')
    }

    if (showMoves) {
      line += gap
      for (let x = 0; x < size; x++) {
        const piece = grid[y][x]
        const isTarget = moves?.some(m => m.to.x === x && m.to.y === y)
        const isCapture = isTarget && piece && piece.color !== moves?.[0]?.piece.color

        let symbol = piece ? pieceSymbol(piece) : '-'
        if (!piece && isTarget)
          symbol = '•'
        if (isCapture)
          symbol = 'x'

        line += symbol.padEnd(cellWidth, ' ')
      }
    }

    output += `${line}\n`
  }

  let bottom = '   '
  for (let x = 0; x < size; x++) bottom += String.fromCharCode(97 + x).toUpperCase().padEnd(cellWidth, ' ')
  if (showMoves) {
    bottom += gap
    for (let x = 0; x < size; x++) bottom += String.fromCharCode(97 + x).toUpperCase().padEnd(cellWidth, ' ')
  }
  output += `${bottom}\n`

  return output
}
