import db from '../../db/db.js'

export const getFilesFormCurrentFolder = async (user_id, parent_id) => {
  const folders = await db('folders')
    .where('parent_id', `${parent_id === null ? 'is' : '='}`, parent_id)
    .andWhere('user_id', '=', user_id)

  let filesId = await db('folder_files')
    .select(['file_id'])
    .where('folder_id', '=', parent_id)

  filesId = filesId.map((file) => file.file_id)
  let files = await db('files').where('id', 'in', filesId)

  return [
    ...folders.map((folder) => ({ ...folder, isFolder: true })),
    ...files.map((file) => ({ ...file, isFolder: false })),
  ]
}
