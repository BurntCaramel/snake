import React from 'react'
import times from 'lodash/times'
import Tile from './Tile'
import { gameStates, tileFoodStates, xyEqual, snakeStateForXY } from '../models/base'

export default function Board({
  gameState,
  columns,
  rows,
  snake1,
  foodXY,
  onKeyChangeDirection
}) {
  return (
    <div
      tabIndex={ -1 }
      className='board'
      onKeyDown={ onKeyChangeDirection }
    >
    {
      times(rows, (y) => (
        <div
          key={ y }
          className='board-row'
        >
        {
          times(columns, (x) => (
            <Tile
              key={`y${y} x${x}`}
              snakeState={ snakeStateForXY(snake1.tailToHead, { x, y } ) }
              foodState={ xyEqual(foodXY, { x, y }) ? tileFoodStates.apple : tileFoodStates.none }
              gameOver={ gameState === gameStates.gameOver }
            />
          ))
        }
        </div>
      ))
    }
    </div>
  )
}