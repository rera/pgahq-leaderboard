import Name, {NameError} from '../Name'

it('initializes', () => {
  const testName = new Name('John', 'Doe')
  expect(testName).toBeDefined()
})

it('returns lastname, firstname with toString', () => {
  const testName = new Name('John', 'Doe')
  expect(testName.toString()).toEqual('Doe, John')
})

it('throws NameError when given non-string first name', () => {
  expect(() => {
    new Name(false, 'Doe') // eslint-disable-line no-new
  }).toThrow(NameError)
})

it('throws NameError when given non-string last name', () => {
  expect(() => {
    new Name('John', 55) // eslint-disable-line no-new
  }).toThrow(NameError)
})
