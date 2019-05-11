import Player from '../Player'

it('initializes', () => {
  const player = new Player(999, 'John', 'Doe', 99)
  expect(player).toBeDefined()
})

it('shows correctly formatted name', () => {
  const player = new Player(999, 'John', 'Doe', 99)
  expect(player.fullName).toEqual('Doe, John')
})

it('shows correct score', () => {
  const testScoreValue = 99
  const player = new Player(999, 'John', 'Doe', testScoreValue)
  expect(player.score).toEqual(testScoreValue)
})
