import Name from './Name'
import Score from './Score'

export default class Player {
  constructor (id, firstName, lastName, score) {
    this.id = id
    this.name = { firstName: firstName, lastName: lastName }
    this.score = score
  }

  get id () {
    return this._id
  }
  set id (value) {
    this._id = value
  }

  get name () {
    return this._name
  }
  get fullName () {
    return this._name.toString()
  }
  set name (value) {
    this._name = new Name(value.firstName, value.lastName)
  }

  get score () {
    return this._score.score
  }
  set score (value) {
    this._score = new Score(value)
  }
}
