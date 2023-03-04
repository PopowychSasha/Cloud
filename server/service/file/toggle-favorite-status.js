import db from '../../db/db.js'

export const toggleFavoriteStatus = async (fileId, user_id) => {
  const favoriteFile = await db('favorite_files')
    .where('file_id', '=', fileId)
    .andWhere('user_id', '=', user_id)
    .first()

  if (favoriteFile) {
    await db('favorite_files')
      .where('file_id', '=', fileId)
      .andWhere('user_id', '=', user_id)
      .del()
  } else {
    await db('favorite_files').insert({ file_id: fileId, user_id: user_id })
  }
}
