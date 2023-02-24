import db from '../../db/db.js'

export const getUsersSpace = async (userId) => {
  const { space } = await db('folders')
    .where('user_id', '=', userId)
    .join('folder_files', 'folders.id', '=', 'folder_files.folder_id')
    .join('files', 'folder_files.file_id', '=', 'files.id')
    .sum('files.size as space')
    .first()

  return +space
}
