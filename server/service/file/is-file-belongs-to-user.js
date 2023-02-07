import db from '../../db/db.js'

export const isFileBelongsToUser = async (fileId, userId) => {
  const folder_file = await db('folder_files')
    .where('file_id', '=', fileId)
    .first()

  if (!folder_file) {
    return false
  }
  const folder = await db('folders')
    .where('id', '=', folder_file.folder_id)
    .first()

  if (folder.user_id === userId) {
    return true
  }
  return false
}
