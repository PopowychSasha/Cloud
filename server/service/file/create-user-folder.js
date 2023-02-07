import db from '../../db/db.js'

export const createUserFolder = async (name, parent_id, user_id) => {
  const [id] = await db('folders').insert({ name: name, parent_id, user_id })

  const folder = await db('folders').where('id', '=', id).first()
  return { ...folder, isFolder: true }
}
