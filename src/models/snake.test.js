import { initial, move, changeDirection } from './snake'
import { directions } from './base'
import makeAwareness from 'awareness'

const applyAction = (prevState, action, args = []) => {
  return new Promise((resolve, reject) => {
    const { handlers } = makeAwareness(
      (stateChanger) => {
        resolve(Object.assign({}, prevState, stateChanger(prevState)))
      },
      {
        initial: () => prevState,
        actionToRun: action
      },
      {
        transformErrorForKey: (key) => (error) => reject(error)
      }
    )

    handlers.actionToRun(...args)
  })
}

it('initial', () => {
  expect(
    initial({
      length: 3,
      tailXY: { x: 5, y: 5 },
      headDirection: directions.east
    })
  ).toEqual({
    headDirection: directions.east,
    tailToHead: [
      { x: 5, y: 5 },
      { x: 6, y: 5 },
      { x: 7, y: 5 },
    ]
  })
})

it('move', async () => {
  expect(
    await applyAction({
      headDirection: directions.east,
      tailToHead: [
        { x: 5, y: 5 },
        { x: 6, y: 5 },
        { x: 7, y: 5 },
      ]
    }, move)
  ).toEqual({
    headDirection: directions.east,
    tailToHead: [
      { x: 6, y: 5 },
      { x: 7, y: 5 },
      { x: 8, y: 5 },
    ]
  })

  expect(
    await applyAction({
      headDirection: directions.north,
      tailToHead: [
        { x: 5, y: 5 },
        { x: 6, y: 5 },
        { x: 7, y: 5 },
      ]
    }, move)
  ).toEqual({
    headDirection: directions.north,
    tailToHead: [
      { x: 6, y: 5 },
      { x: 7, y: 5 },
      { x: 7, y: 4 },
    ]
  })
})

it('changeDirection', async () => {
  expect(
    await applyAction({
      headDirection: directions.east,
      tailToHead: [
        { x: 5, y: 5 },
        { x: 6, y: 5 },
        { x: 7, y: 5 },
      ]
    }, changeDirection, [directions.north])
  ).toEqual({
    headDirection: directions.north,
      tailToHead: [
        { x: 5, y: 5 },
        { x: 6, y: 5 },
        { x: 7, y: 5 },
      ]
  })
})
