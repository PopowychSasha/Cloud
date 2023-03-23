import db from '../../db/db.js'

export const searchUserFiles = async (
  userId,
  { parts, ext },
  column = 'id',
  order = 'asc',
  rowsPerPage = null,
  start = 0
) => {
  const filterBySearchParts = function (queryBuilder) {
    parts.forEach((item) => queryBuilder.whereILike('files.name', `%${item}%`))
    if (ext) {
      queryBuilder.andWhereILike('files.name', `%${'.' + ext}`)
    }
  }
  const searchFilesQuery = db('files')
    .select(
      'files.*',
      db.raw('favorite_files.id is not null as isFavorite'),
      'share_by_links.token'
    )
    .modify(filterBySearchParts)
    .join('folder_files', 'files.id', 'folder_files.file_id')
    .join('share_by_links', 'share_by_links.file_id', 'folder_files.file_id')
    .join('folders', 'folder_files.folder_id', 'folders.id')
    .join('users', 'folders.user_id', 'users.id')
    .leftOuterJoin('favorite_files', 'files.id', 'favorite_files.file_id')
    .unionAll(
      db('shared_files')
        .select(
          'files.*',
          db.raw('favorite_files.id is not null as isFavorite'),
          'share_by_links.token'
        )
        .join('files', 'shared_files.file_id', 'files.id')
        .join('folder_files', 'files.id', 'folder_files.file_id')
        .join(
          'share_by_links',
          'share_by_links.file_id',
          'folder_files.file_id'
        )
        .where('shared_files.user_id', '=', userId)
        .modify(filterBySearchParts)
        .join('folders', 'folder_files.folder_id', 'folders.id')
        .join('users', 'folders.user_id', 'users.id')
        .leftOuterJoin('favorite_files', 'files.id', 'favorite_files.file_id')
    )
    .where('folders.user_id', '=', userId)
    .orderBy(column, order)

  const { count } = await db
    .from(searchFilesQuery.as('searchFilesQuery'))
    .count('*', { as: 'count' })
    .first()

  const files = await searchFilesQuery.limit(rowsPerPage).offset(start)
  return { files, countOfFilesInFolder: count }
}
