import { xyEqual, xyInDirection, xyInArray } from './base'

export const initial = ({
  length,
  tailXY,
  headDirection
}) => ({
  tailToHead: Array.from({ length }, (_v, index) => xyInDirection(tailXY, headDirection, index)),
  headDirection,
  movesSinceFood: Infinity
})

export const move = ({}, { foodXY, columns, rows, mirror }) => ({ headDirection, tailToHead, movesSinceFood }) => {
  const oldHead = tailToHead[tailToHead.length - 1]
  let rest = tailToHead

  const ateFood = xyEqual(oldHead, foodXY)
  // If ate food, keep extended length i.e. grow
  if (ateFood) {
    movesSinceFood = 0
  }
  // Otherwise, the snake will move along
  else {
    rest = rest.slice(1)
    movesSinceFood += 1
  }
  
  let newHead = xyInDirection(oldHead, headDirection)

  const adjustedHead = {
    x: (newHead.x + columns) % columns,
    y: (newHead.y + rows) % rows
  }

  if (mirror) {
    newHead = adjustedHead
  }
  // If head has been adjusted to not go beyond walls
  else if (!xyEqual(newHead, adjustedHead)) {
    return {
      hitWall: true,
    }
  }

  const hitSelf = xyInArray(rest, newHead)

  return {
    tailToHead: [ ...rest, newHead ],
    movesSinceFood,
    hitSelf,
  }
}

export const changeDirection = ({}, newDirection) => ({ headDirection: newDirection })
