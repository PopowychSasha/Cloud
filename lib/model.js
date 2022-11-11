export default class Model {
  #data = []

  constructor(modelName) {
    this.modelName = modelName
    this.id = 1
  }

  #requirements = {
    type: (entityKey, entityValue) => {
      if (typeof entityValue !== this.modelSchema[entityKey].type) {
        throw new Error(
          `${entityKey} has ${typeof entityValue} type, but must to have ${
            this.modelSchema[entityKey].type
          }`
        )
      }
    },
    isRequired: (entityKey, entityValue) => {
      if (
        !!entityValue !== this.modelSchema[entityKey].isRequired &&
        this.modelSchema[entityKey].isRequired
      ) {
        throw new Error(`${entityKey} is required`)
      }
    },
    minNumber: (entityKey, entityValue) => {
      if (entityValue < this.modelSchema[entityKey].minNumber) {
        throw new Error(
          `${entityKey} has a ${this.modelSchema[entityKey].minNumber} minimum`
        )
      }
    },
    maxNumber: (entityKey, entityValue) => {
      if (entityValue > this.modelSchema[entityKey].maxNumber) {
        throw new Error(
          `${entityKey} has a ${this.modelSchema[entityKey].maxNumber} maximum`
        )
      }
    },
    minLength: (entityKey, entityValue) => {
      if (entityValue.length < this.modelSchema[entityKey].minLength) {
        throw new Error(
          `${entityKey} has a ${this.modelSchema[entityKey].minLength} min length`
        )
      }
    },
    maxLength: (entityKey, entityValue) => {
      if (entityValue.length > this.modelSchema[entityKey].maxLength) {
        throw new Error(
          `${entityKey} has a ${this.modelSchema[entityKey].maxLength} max length`
        )
      }
    },
    regex: (entityKey, entityValue) => {
      if (!entityValue.match(this.modelSchema[entityKey].regex)) {
        throw new Error(`regex error for ${entityKey}`)
      }
    },
  }

  #validate(entity) {
    for (let key in entity) {
      for (let keyOfDetermination in this.modelSchema[key]) {
        this.#requirements[keyOfDetermination](key, entity[key])
      }
    }
  }

  define(modelSchema) {
    this.modelSchema = modelSchema
  }

  insert(entity) {
    this.#validate(entity)

    const newEntity = {}

    for (let key in entity) {
      if (this.modelSchema.hasOwnProperty(key) && entity[key]) {
        newEntity[key] = entity[key]
      }
    }
    this.#data.push({ id: this.id++, ...newEntity })
  }
  select() {
    return this.#data
  }
  selectById(id) {
    for (const entity of this.#data) {
      if (entity.id === id) {
        return entity
      }
    }
  }
  updateById(id, newDataForEntity) {
    this.#validate(newDataForEntity)

    const index = this.#data.findIndex((entity) => entity.id === id)

    const filterNewDataForEntity = {}
    for (let keyForNewData in newDataForEntity) {
      if (this.#data[index].hasOwnProperty(keyForNewData)) {
        filterNewDataForEntity[keyForNewData] = newDataForEntity[keyForNewData]
      }
    }
    this.#data[index] = { ...this.#data[index], ...filterNewDataForEntity }
  }

  deleteById(id) {
    this.#data = this.#data.filter((entity) => entity.id !== id)
  }
  delete() {
    this.#data = []
  }
}
