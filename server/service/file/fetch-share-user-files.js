import db from '../../db/db.js'

export const fetchShareUserFiles = async (userId) =>
  db('shared_files')
    .select(
      'files.*',
      'share_by_links.token',
      db.raw('false as isFolder'),
      db.raw('null as parent_id'),
      db.raw('false as user_id'),
      'shared_files.readonly',
      'shared_files.user_id',
      db.raw('favorite_files.id is not null as isFavorite')
    )
    .join('files', 'shared_files.file_id', '=', 'files.id')
    .join('share_by_links', 'files.id', '=', 'share_by_links.file_id')
    .leftOuterJoin(
      'favorite_files',
      'share_by_links.file_id',
      'favorite_files.file_id'
    )
    .where('shared_files.user_id', '=', userId)
