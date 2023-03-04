import db from '../../db/db.js'

export const deleteSharedSelectedFiles = async (userId, deleteFilesId) =>
  db('shared_files')
    .where('file_id', 'in', deleteFilesId)
    .andWhere('user_id', '=', userId)
    .del()
