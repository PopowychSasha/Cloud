import db from '../../db/db.js'

export const createUserFile = async (folder_id, originalname, hash) => {
  await db.transaction(async (trx) => {
    const [file_id] = await db('files')
      .insert({
        name: originalname,
        hash,
      })
      .transacting(trx)

    await db('folder_files').insert({ folder_id, file_id }).transacting(trx)
  })
  const file = await db('files').where('hash', '=', hash).first()
  return { ...file, isFolder: false }
}
