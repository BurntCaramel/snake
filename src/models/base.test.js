import { directions, getOppositeDirection, xyInDirection } from './base'

it('getOppositeDirection', () => {
  expect(getOppositeDirection(directions.north)).toEqual(directions.south)
  expect(getOppositeDirection(directions.south)).toEqual(directions.north)
  expect(getOppositeDirection(directions.east)).toEqual(directions.west)
  expect(getOppositeDirection(directions.west)).toEqual(directions.east)
})

it('xyInDirection', () => {
  expect(xyInDirection({ x: 5, y: 5 }, directions.north)).toEqual({ x: 5, y: 4 })
  expect(xyInDirection({ x: 5, y: 5 }, directions.east)).toEqual({ x: 6, y: 5 })
  expect(xyInDirection({ x: 5, y: 5 }, directions.south)).toEqual({ x: 5, y: 6 })
  expect(xyInDirection({ x: 5, y: 5 }, directions.west)).toEqual({ x: 4, y: 5 })
})

it('xyInDirection with distance', () => {
  expect(xyInDirection({ x: 5, y: 5 }, directions.north, 3)).toEqual({ x: 5, y: 2 })
  expect(xyInDirection({ x: 5, y: 5 }, directions.east, 3)).toEqual({ x: 8, y: 5 })
  expect(xyInDirection({ x: 5, y: 5 }, directions.south, 3)).toEqual({ x: 5, y: 8 })
  expect(xyInDirection({ x: 5, y: 5 }, directions.west, 3)).toEqual({ x: 2, y: 5 })
})
