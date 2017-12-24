import { xyEqual, xyInDirection } from './base'

export const initial = ({
  length,
  tailXY,
  headDirection
}) => ({
  tailToHead: Array.from({ length }, (_v, index) => xyInDirection(tailXY, headDirection, index)),
  headDirection
})

export const move = ({}, { foodXY, columns, rows, mirror = true }) => ({ headDirection, tailToHead }) => {
  const oldHead = tailToHead[tailToHead.length - 1]
  let rest = tailToHead

  const ateFood = xyEqual(oldHead, foodXY)
  // If ate food, keep extended length i.e. grow
  // Otherwise, the snake will move along
  if (!ateFood) {
    rest = rest.slice(1)
  }
  
  let newHead = xyInDirection(oldHead, headDirection)

  if (mirror) {
    newHead.x = (newHead.x + columns) % columns
    newHead.y = (newHead.y + rows) % rows
  }

  return {
    headDirection,
    tailToHead: [ ...rest, newHead ],
    ateFood,
  }
}

export const changeDirection = ({}, newDirection) => ({ headDirection: newDirection })
