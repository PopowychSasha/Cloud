import db from '../../db/db.js'
import { unlink } from 'node:fs'
import { getFilePath } from './get-file-path.js'

export const deleteSelectedFiles = async (userId, files) => {
  const topLevelFolderIds = files
    .filter((item) => item.isFolder)
    .map((item) => item.id)

  const topLevelFilesIds = files
    .filter((item) => !item.isFolder)
    .map((item) => item.id)

  const folderIds = await db()
    .withRecursive('cte_name', (qb) => {
      qb.select('*')
        .from('folders')
        .where('id', 'in', topLevelFolderIds)
        .unionAll(
          db()
            .from('folders')
            .select('folders.*')
            .join('cte_name', 'folders.parent_id', 'cte_name.id')
        )
    })
    .select('*')
    .from('cte_name')
    .where('user_id', '=', userId)
    .pluck('id')

  const fileIds = await db()
    .from('files')
    .select('files.id')
    .join('folder_files', 'files.id', 'folder_files.file_id')
    .join('folders', 'folder_files.folder_id', 'folders.id')
    .where('folder_files.folder_id', 'in', folderIds)
    .andWhere('folders.user_id', '=', userId)
    .unionAll(
      db()
        .from('files')
        .select('files.id')
        .where('files.id', 'in', topLevelFilesIds)
        .join('folder_files', 'files.id', 'folder_files.file_id')
        .join('folders', 'folder_files.folder_id', 'folders.id')
        .where('folders.user_id', '=', userId)
        .pluck('files.id')
    )
    .pluck('files.id')

  const filesOnServerNeedDelete = await db()
    .from('files')
    .select('hash')
    .groupBy('hash')
    .havingRaw('count(hash) = 1')

  for (const file of filesOnServerNeedDelete) {
    unlink(getFilePath(file.hash), (err) => {
      if (err) console.log(err)
    })
  }

  await db.transaction(async (trx) => {
    await db('files').where('id', 'in', fileIds).del().transacting(trx)
    await db('folders').where('id', 'in', folderIds).del().transacting(trx)
  })
}
