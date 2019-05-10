export default class Score {
  constructor (score) {
    this.score = score
  }

  get score () {
    return this._score
  }
  set score (value) {
    if (typeof value !== 'number') {
      throw new ScoreError('Score must be a number.')
    } else if (!Number.isInteger(value)) {
      throw new ScoreError('Score must be an integer.')
    } else if (!(value <= 100 && value >= 0)) {
      throw new ScoreError('Score must be between 0 and 100.')
    }
    this._score = value
  }
}

export class ScoreError extends Error {
  constructor (...args) {
    super(...args)
    Error.captureStackTrace(this, ScoreError)
  }
}
