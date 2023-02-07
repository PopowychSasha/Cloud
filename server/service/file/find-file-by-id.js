import db from '../../db/db.js'

export const findFileById = async (id) =>
  db('files').where('id', '=', id).first()
