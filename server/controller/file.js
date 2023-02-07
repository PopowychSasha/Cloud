import { createUserFile } from '../service/file/create-user-file.js'
import { createUserFolder } from '../service/file/create-user-folder.js'
import { getFilesFormCurrentFolder } from '../service/file/get-files-from-current-folder.js'
import crypto from 'crypto'
import fs from 'fs'
import { getFilePath } from '../service/file/get-file-path.js'
import { getUsersFile } from '../service/file/get-users-file.js'

export const createFolder = async (req, res, next) => {
  const { name, parentId } = req.body
  const { id } = req.user
  const folder = await createUserFolder(name, parentId, id)
  return res.status(201).json(folder)
}

export const uploadFile = async (req, res, next) => {
  const folderId =
    req.body.folderId === 'null' ? null : Number(req.body.folderId)

  const { id } = req.user

  const filePath = getFilePath(req.file.name)

  fs.readFile(filePath, { encoding: 'utf-8' }, async function (err, file) {
    if (!err) {
      const hashSum = crypto.createHash('sha256')
      hashSum.update(file)

      const hash = hashSum.digest('hex')

      const userFile = await createUserFile(
        folderId,
        req.file.originalname,
        hash
      )

      const renamePath = getFilePath(hash)

      fs.rename(filePath, renamePath, function (err) {
        if (err) console.log(err)
      })
      return res.status(201).json(userFile)
    } else {
      console.log(err)
    }
  })
}

export const getFilesFromFolder = async (req, res, next) => {
  const parendFolderId = req.params.id === 'null' ? null : Number(req.params.id)

  const { id } = req.user
  const files = await getFilesFormCurrentFolder(id, parendFolderId)
  res.status(200).json(files)
}

export const downloadFile = async (req, res, next) => {
  const { id } = req.params

  const file = await getUsersFile(req.user.id, id)

  if (!file) {
    return res.status(404).json({ message: 'file not found' })
  }
  const userFile = getFilePath(file.hash)
  res.download(userFile)
}
