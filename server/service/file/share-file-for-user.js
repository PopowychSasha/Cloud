import db from '../../db/db.js'

export const shareFileForUser = async (userId, files, readonly = true) => {
  const sharedFiles = files
    .filter((item) => !item.isFolder)
    .map((file) => ({ file_id: file.id, user_id: userId, readonly }))

  const sharedUserFiles = await db('shared_files').where('user_id', '=', userId)

  for (const file of sharedFiles) {
    if (sharedUserFiles.some((item) => file.file_id === item.file_id)) {
      const createdFile = await db('files')
        .where('id', '=', file.file_id)
        .first()
      throw new Error(`File ${createdFile.name} is already shared`)
    }
  }

  await db('shared_files').insert(sharedFiles)
}
