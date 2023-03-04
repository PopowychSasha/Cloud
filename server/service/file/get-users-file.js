import db from '../../db/db.js'

export const getUsersFile = async (user_id, file_id) =>
  db('files')
    .join('folder_files', 'files.id', '=', 'folder_files.file_id')
    .join('folders', 'folder_files.folder_id', '=', 'folders.id')
    .leftOuterJoin(
      'shared_files',
      'shared_files.user_id',
      '=',
      'folders.user_id'
    )
    .where('folders.user_id', '=', user_id)
    .orWhere('shared_files.user_id', '=', user_id)
    .andWhere('files.id', '=', file_id)
    .first()
