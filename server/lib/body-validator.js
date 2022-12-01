export class Validator {
  chainOfValidation = []

  type = (type) => {
    this.chainOfValidation.push('type')
    if (this.value === null || this.value === undefined) {
      return this
    }
    if (typeof this.value !== type) {
      throw new Error(`${this.field} should to have ${type} type`)
    }
    return this
  }

  require = () => {
    this.chainOfValidation.push('require')

    if (!this.value && this.value !== 0) {
      throw new Error(`${this.field} is require`)
    }

    return this
  }
  isLength = ({ min, max }) => {
    this.chainOfValidation.push('isLength')

    if (typeof this.value === 'number' && this.value < min) {
      throw new Error(`value of ${this.field} is too small`)
    }
    if (typeof this.value === 'number' && this.value > max) {
      throw new Error(`value of ${this.field} is too big`)
    }
    if (typeof this.value === 'string' && this.value.length < min) {
      throw new Error(`length of ${this.field} is too small`)
    }
    if (typeof this.value === 'string' && this.value.length > max) {
      throw new Error(`length of ${this.field} is too big`)
    }

    return this
  }

  match = (expretion) => {
    this.chainOfValidation.push('match')

    if (this.value === null || this.value === undefined) {
      return this
    }

    if (typeof this.value !== 'string') {
      throw new Error('match function is only for string type')
    }

    if (!this.value.match(expretion)) {
      throw new Error(`${this.field} value dont match with regex ${expretion}`)
    }
    return this
  }

  arrayOf = (requirements) => {
    this.chainOfValidation.push('arrayOf')
    const list = this.value

    if (this.value === null || this.value === undefined) {
      return this
    }

    if (!Array.isArray(list) && this.chainOfValidation.includes('require')) {
      throw new Error(`${this.field} is not an array`)
    }
    for (const item of list) {
      this.value = item
      if (
        this.chainOfValidation.length !== new Set(this.chainOfValidation).size
      ) {
        throw new Error('repetition of the validator type')
      }
      this.chainOfValidation = []
      requirements()
    }

    return this
  }

  trim = () => {
    this.chainOfValidation.push('trim')

    if (this.value === null || this.value === undefined) {
      return this
    }
    if (
      this.chainOfValidation.includes('require') &&
      typeof this.value !== 'string'
    ) {
      throw new Error('trim function is only for string type')
    }

    let keys = this.path.split('.')

    const findKey = (body, keys) => {
      if (keys.length === 1) {
        if (typeof this.value === 'string') body[keys[0]] = body[keys[0]].trim()
      }
      for (const key in body) {
        if (typeof body[key] === 'object') {
          keys.shift()
          findKey(body[key], keys)
        }
      }
    }

    findKey(this.body, keys)
    return this
  }
}

const getValue = (obj, path) => {
  path = path.split('.')
  const len = path.length
  for (let i = 0; i < len; i++) {
    obj = obj[path[i]]
  }
  return obj
}

export function body(path, requirements) {
  return function () {
    return (req, res, next) => {
      this.field = path.split('.')[path.split('.').length - 1]
      this.value = getValue(req.body, path)
      this.body = req.body
      this.path = path

      if (
        this.chainOfValidation.length !== new Set(this.chainOfValidation).size
      ) {
        throw new Error('repetition of the validator type')
      }

      this.chainOfValidation = []
      requirements(this)

      next()
    }
  }.call(new Validator())
}
