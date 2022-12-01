import Model from '../../lib/model.js'

export default class UserModel extends Model {
  modelSchema = {
    name: {
      type: 'string',
      isRequired: true,
      minLength: 2,
      maxLength: 20,
      regex: /.../,
    },
    age: {
      type: 'number',
      isRequired: true,
      minNumber: 6,
      maxNumber: 100,
    },
    other: {
      type: 'string',
      isRequired: false,
      minLength: 2,
      maxLength: 100,
      regex: /./,
    },
  }
}
