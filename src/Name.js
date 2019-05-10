export default class Name {
  constructor (firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }

  get firstName () {
    return this._firstName
  }
  set firstName (value) {
    if (typeof value !== 'string') {
      throw new NameError('First name must be a string.')
    }
    this._firstName = value
  }

  get lastName () {
    return this._lastName
  }
  set lastName (value) {
    if (typeof value !== 'string') {
      throw new NameError('Last name must be a string.')
    }
    this._lastName = value
  }

  toString () {
    return this.lastName + ', ' + this.firstName
  }
}

export class NameError extends Error {
  constructor (...args) {
    super(...args)
    Error.captureStackTrace(this, NameError)
  }
}
