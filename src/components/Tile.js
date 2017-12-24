import React from 'react'
import { tileSnakeStates, tileFoodStates, tileLevelStates, tileUserStates } from '../models/base'

export default function Tile({
  snakeState = tileSnakeStates.body,
  foodState = tileFoodStates.none,
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
          '👅'
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