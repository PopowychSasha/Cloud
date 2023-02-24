import db from '../../db/db.js'

export const createUserFile = async (folder_id, originalname, size, hash) => {
  await db.transaction(async (trx) => {
    const [file_id] = await db('files')
      .insert({
        name: originalname,
        size,
        hash,
      })
      .transacting(trx)

    await db('folder_files').insert({ folder_id, file_id }).transacting(trx)
  })
  return db('files')
    .select('*', db.raw('false as isFolder'))
    .where('hash', '=', hash)
    .orderBy('id', 'desc')
    .first()
}
