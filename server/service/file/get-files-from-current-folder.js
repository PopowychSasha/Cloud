import db from '../../db/db.js'

export const getFilesFormCurrentFolder = async (user_id, parent_id) =>
  db
    .select(
      'id',
      'name',
      db.raw('null as size'),
      db.raw('null as hash'),
      'created_at',
      'updated_at',
      'parent_id',
      'user_id',
      db.raw('true as isFolder'),
      db.raw('null as token'),
      db.raw('false as isFavorite')
    )
    .from('folders')
    .where('parent_id', `${parent_id === null ? 'is' : '='}`, parent_id)
    .andWhere('user_id', '=', user_id)
    .union(function () {
      this.select(
        'files.id',
        'files.name',
        'files.size',
        'files.hash',
        'files.created_at',
        'files.updated_at',
        db.raw('null as parent_id'),
        db.raw('null as user_id'),
        db.raw('false as isFolder'),
        'share_by_links.token',
        db.raw('favorite_files.id is not null as isFavorite')
      )
        .from('files')
        .join('folder_files', 'files.id', '=', 'folder_files.file_id')
        .where('folder_files.folder_id', '=', parent_id)
        .join(
          'share_by_links',
          'folder_files.file_id',
          '=',
          'share_by_links.file_id'
        )
        .leftOuterJoin(
          'favorite_files',
          'share_by_links.file_id',
          'favorite_files.file_id'
        )
    })
