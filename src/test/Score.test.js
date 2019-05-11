import Score, { ScoreError } from '../Score'

it('initializes', () => {
  const testScore = new Score(99)
  expect(testScore).toBeDefined()
})

it('returns correct score', () => {
  const testScoreValue = 99
  const testScore = new Score(testScoreValue)
  expect(testScore.score).toEqual(testScoreValue)
})

it('throws ScoreError when given non-number', () => {
  expect(() => {
    new Score('eight') // eslint-disable-line no-new
  }).toThrow(ScoreError)
})

it('throws ScoreError when given non-integer', () => {
  expect(() => {
    new Score(10.5) // eslint-disable-line no-new
  }).toThrow(ScoreError)
})

it('throws ScoreError when given integer greater than 100', () => {
  expect(() => {
    new Score(105) // eslint-disable-line no-new
  }).toThrow(ScoreError)
})

it('throws ScoreError when given integer less than 0', () => {
  expect(() => {
    new Score(-1) // eslint-disable-line no-new
  }).toThrow(ScoreError)
})
