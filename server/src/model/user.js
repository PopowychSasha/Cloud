import Model from '../../lib/model.js'

export default class UserModel extends Model {
  modelSchema = {
    name: {
      type: 'string',
      isRequired: true,
      minLength: 2,
      maxLength: 20,
    },
    email: {
      type: 'string',
      isRequired: true,
      regex: /gmail.com/,
    },
    password: {
      type: 'string',
      isRequired: true,
      minLength: 2,
      maxLength: 100,
    },
  }
}
