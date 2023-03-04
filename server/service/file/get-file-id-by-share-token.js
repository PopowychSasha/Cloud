import db from '../../db/db.js'

export const getFileIdByShareToken = (shareFileToken) =>
  db('share_by_links').select('id').where('token', '=', shareFileToken).first()
