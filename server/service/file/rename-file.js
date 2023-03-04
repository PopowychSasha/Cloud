import db from '../../db/db.js'

export const renameFile = async (name, fileId, isFolder) =>
  db(`${isFolder ? 'folders' : 'files'}`)
    .update({ name: name })
    .where('id', '=', fileId)
