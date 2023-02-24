import db from '../../db/db.js'

export const createUserFolder = async (name, parent_id, user_id) => {
  const [id] = await db('folders').insert({ name: name, parent_id, user_id })

  return db('folders')
    .select('*', db.raw('true as isFolder'))
    .where('id', '=', id)
    .first()
}
