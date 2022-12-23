const typeOfValidator = (type) => (value, path) => {
  const fullPath = path.join('.')
  if (typeof value === type) {
    return []
  }
  return [
    `${fullPath}:${value} must have type ${type} but has type ${typeof value}`,
  ]
}

const requiredStringValidator = typeOfValidator('string')
const requiredNumberValidator = typeOfValidator('number')
const requiredBooleanValidator = typeOfValidator('boolean')
const requiredFunctionValidator = typeOfValidator('function')

const makeOptionalValidator = (validator) => {
  const optionalValidator = (value, path) => {
    const result = validator(value, path)

    if (result.length === 0 || value === null || value === undefined) {
      return []
    }
    return result
  }

  optionalValidator.isRequired = validator
  return optionalValidator
}

const match = (reg) => (value, path) => {
  const fullPath = path.join('.')
  if (typeof value === 'string' && value.match(reg)) {
    return []
  }
  return [`${fullPath}:${value} does not match ${reg}`]
}

const oneOfType = (validators) => (value, path) => {
  const fullPath = path.join('.')
  if (validators.some((vl) => vl(value, path).length === 0)) {
    return []
  }
  return [`${fullPath}: does not match specification`]
}

const oneOf = (items) => (value, path) => {
  const fullPath = path.join('.')
  if (items.some((item) => Object.is(value, item))) {
    return []
  }
  return [`${fullPath}: does not match value`]
}

const shape = (schema) => {
  return (value, path) => {
    const fullPath = path.join('.')
    if (value === null || Array.isArray(value) || typeof value !== 'object') {
      return [`${fullPath}: must be an object`]
    }
    return Object.keys(schema).flatMap((item) => {
      schema[item](value[item], [...path, item])
    })
  }
}

const arrayOf = (validator) => (value, path) => {
  const fullPath = path.join('.')

  if (!Array.isArray(value)) {
    return [`${fullPath}: is not an array`]
  }

  return value.flatMap((item, index) => validator(item, [...path, index]))
}

const instanceOf = (className) => (value, path) => {
  const fullPath = path.join('.')
  if (value instanceof className) {
    return []
  }
  return [`${fullPath}: not instanceOf ${className}`]
}

const strValidator = makeOptionalValidator(requiredStringValidator)
strValidator.match = (rg) => makeOptionalValidator(match(rg))

export default {
  number: makeOptionalValidator(requiredNumberValidator),
  string: strValidator,
  boolean: makeOptionalValidator(requiredBooleanValidator),
  function: makeOptionalValidator(requiredFunctionValidator),
  shape: (schema) => makeOptionalValidator(shape(schema)),
  arrayOf: (validator) => makeOptionalValidator(arrayOf(validator)),
  oneOfType,
  oneOf: (list) => makeOptionalValidator(oneOf(list)),
  instanceOf: (className) => makeOptionalValidator(instanceOf(className)),
}
