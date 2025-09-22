import type { MoveCommand } from '@/engine/moves/MoveCommand'
import type { Piece } from '@/engine/pieces/Piece'
import { Color } from '@/engine/types/enums/color'

function pieceSymbol(piece: Piece): string {
  const symbols: Record<string, Record<Color, string>> = {
    Pawn: { [Color.White]: '♟', [Color.Black]: '♙' },
    Rook: { [Color.White]: '♜', [Color.Black]: '♖' },
    Knight: { [Color.White]: '♞', [Color.Black]: '♘' },
    Bishop: { [Color.White]: '♝', [Color.Black]: '♗' },
    Queen: { [Color.White]: '♛', [Color.Black]: '♕' },
    King: { [Color.White]: '♚', [Color.Black]: '♔' },
    PieceMock: { [Color.White]: '◉', [Color.Black]: '☉' },
  }

  const name = piece.constructor.name
  const colorKey = piece.color === Color.Black ? Color.Black : Color.White
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
