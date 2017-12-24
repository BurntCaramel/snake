export const gameStates = {
  fresh: 0, // Has not made a move yet
  restarting: 1, // About to restart
  playing: 2, // Has made first move
  winner: 20, // Won the game
  gameOver: 30 // Lost the game
}

export const gameStateDataChoices = {
  [gameStates.gameOver]: {
    hitSelf: 1,
    hitWall: 2,
    atePoison: 3,
  }
}

export const directions = {
  north: 1,
  east: 2,
  south: 3,
  west: 4,
}

export const getOppositeDirection = (direction) => (direction + 1) % 4 + 1

const keyCodes = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
}

export const keyCodesToDirections = {
  [keyCodes.up]: directions.north,
  [keyCodes.right]: directions.east,
  [keyCodes.down]: directions.south,
  [keyCodes.left]: directions.west,
}

export const tileSnakeStates = {
  none: 0,
  head: 1,
  body: 2,
  tail: 3
}

export const tileFoodStates = {
  none: 0,
  apple: 1
}

export const tileLevelStates = {}
export const tileUserStates = {}

export const difficulties = {
  easy: {
    columns: 8,
    rows: 8,
  },
  intermediate: {
    columns: 20,
    rows: 20,
  }
}

export function xyEqual(a, b) {
  return (a.x === b.x && a.y === b.y)
}

export function xyInDirection({ x, y }, direction, distance = 1) {
  switch (direction) {
    case directions.north:
      return { x, y: y - distance }
    case directions.east:
      return { x: x + distance, y }
    case directions.south:
      return { x, y: y + distance }
    case directions.west:
      return { x: x - distance, y }
    default:
      throw new Error(`Unknown direction: ${direction}`)
  }
}

export const xyInArray = (arrayOfXYs, checkXY) => arrayOfXYs.some((xy) => xyEqual(checkXY, xy))

export function snakeStateForXY(tailToHead, current) {
  const foundIndex = tailToHead.findIndex((xy) => xyEqual(xy, current))

  if (foundIndex === 0) {
    return tileSnakeStates.tail
  }
  else if (foundIndex === tailToHead.length - 1) {
    return tileSnakeStates.head
  }
  else if (foundIndex != -1) {
    return tileSnakeStates.body
  }
  else {
    return tileSnakeStates.none
  }
}
