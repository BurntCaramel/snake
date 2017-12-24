import React from 'react'
import { tileSnakeStates, tileFoodStates, tileLevelStates, tileUserStates } from '../models/base'

export default function Tile({
  snakeState = tileSnakeStates.body,
  foodState = tileFoodStates.none,
  gameOver
}) {
  const className = [
    'tile',
    '-open',
    false && '-bomb',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={ className }
    >
      {
        (snakeState === tileSnakeStates.head) ? (
          gameOver ? (
            '💀'
          ) : (
            '👅'
          )
        ) : (snakeState === tileSnakeStates.body) ? (
          '💛'
        ) : (snakeState === tileSnakeStates.tail) ? (
          '💜'
        ) : (foodState === tileFoodStates.apple) ? (
          '🍏'
        ) : (foodState === tileFoodStates.poison) ? (
          '🍄'
        ) : (
          ''
        )
      }
    </div>
  )
}