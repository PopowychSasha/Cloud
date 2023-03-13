import { createUserFile } from '../service/file/create-user-file.js'
import { createUserFolder } from '../service/file/create-user-folder.js'
import { getFilesFormCurrentFolder } from '../service/file/get-files-from-current-folder.js'
import crypto from 'crypto'
import fs from 'fs'
import { getFilePath } from '../service/file/get-file-path.js'
import { getUsersFile } from '../service/file/get-users-file.js'
import { deleteSelectedFiles } from '../service/file/delete-selected-files.js'
import { getUsersSpace } from '../service/file/get-users-space.js'
import { isDiskSpaceAvailable } from '../service/file/is-disk-space-available.js'
import { v4 as uuidv4 } from 'uuid'
import { findUserByEmailAndPassword } from '../service/auth/find-user-by-email-and-password.js'
import { fetchShareUserFiles } from '../service/file/fetch-share-user-files.js'
import { findUserByEmail } from '../service/auth/find-user-by-email.js'
import { deleteSharedSelectedFiles } from '../service/file/delete-shared-selected-files.js'
import { renameFile } from '../service/file/rename-file.js'
import { shareFileForUser } from '../service/file/share-file-for-user.js'
import { toggleFavoriteStatus } from '../service/file/toggle-favorite-status.js'
import { getFileIdByShareToken } from '../service/file/get-file-id-by-share-token.js'

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

  try {
    await isDiskSpaceAvailable(id, req.file.size)
  } catch (err) {
    return next(err)
  }
  fs.readFile(filePath, { encoding: 'utf-8' }, async function (err, file) {
    if (!err) {
      const hashSum = crypto.createHash('sha256')
      hashSum.update(file)

      const hash = hashSum.digest('hex')
      const sharedFileToken = uuidv4()

      const userFile = await createUserFile(
        folderId,
        req.file.originalname,
        req.file.size,
        hash,
        sharedFileToken
      )

      const renamePath = getFilePath(hash)

      fs.rename(filePath, renamePath, function (err) {
        if (err) console.log(err)
      })

      return res.status(201).json({ ...userFile, token: sharedFileToken })
    } else {
      console.log(err)
    }
  })
}

export const getFilesFromFolder = async (req, res, next) => {
  const { id } = req.user
  const { rowsPerPage, start, column, order } = req.query
  const parendFolderId = req.params.id === 'null' ? null : Number(req.params.id)

  const files = await getFilesFormCurrentFolder(
    id,
    parendFolderId,
    column,
    order,
    +rowsPerPage,
    +start
  )
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

export const deleteFiles = async (req, res, next) => {
  const { files, parendFolderId } = req.body
  const { id } = req.user
  const { rowsPerPage, start, column, order } = req.query

  try {
    await deleteSelectedFiles(id, files)
  } catch (err) {
    console.log(err)
    return next(err)
  }

  const userfiles = await getFilesFormCurrentFolder(
    id,
    parendFolderId,
    column,
    order,
    +rowsPerPage,
    +start
  )
  res.status(200).json(userfiles)
}

export const getSpaceInfo = async (req, res, next) => {
  const { id } = req.user

  try {
    const space = await getUsersSpace(id)
    res.status(200).json({ space, availableSpace: 5000000000 })
  } catch (err) {
    return next(err)
  }
}

export const shareFileByLink = async (req, res, next) => {
  const { email, password, share_token } = req.body
  const user = await findUserByEmailAndPassword(email, password)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  try {
    const { id } = await getFileIdByShareToken(share_token)
    if (!id) {
      throw new Error('invalid share token')
    }

    await shareFileForUser(user.id, [{ id: id }])
  } catch (err) {
    return next(err)
  }
  return res.status(200).json({})
}

export const fetchShareFile = async (req, res, next) => {
  const { id } = req.user
  const { rowsPerPage, start, column, order } = req.query
  const sharedFiles = await fetchShareUserFiles(
    id,
    column,
    order,
    +rowsPerPage,
    +start
  )
  return res.status(200).json(sharedFiles)
}

export const shareFileByEmail = async (req, res, next) => {
  const { email, files, readonly } = req.body

  if (files.length === 0) {
    return res.status(500).json({ message: 'You need to select some files' })
  }
  const folders = files.find((file) => file.isFolder)

  if (folders) {
    return res.status(500).json({ message: 'you cannot share  folders' })
  }
  const user = await findUserByEmail(email)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  try {
    await shareFileForUser(user.id, files, readonly)
    return res.json({})
  } catch (err) {
    next(err)
  }
}

export const deleteSharedFiles = async (req, res, next) => {
  const { files } = req.body
  const { id } = req.user
  const { rowsPerPage, start, column, order } = req.query
  const deleteFilesId = files.map((file) => file.id)

  await deleteSharedSelectedFiles(id, deleteFilesId)

  const sharedFiles = await fetchShareUserFiles(
    id,
    column,
    order,
    +rowsPerPage,
    +start
  )
  return res.status(200).json(sharedFiles)
}

export const renameUsersFile = async (req, res, next) => {
  const { fileId, name, isFolder } = req.body

  await renameFile(name, fileId, isFolder)

  return res.status(200).json({})
}

export const favoriteFileToggle = async (req, res, next) => {
  const { fileId } = req.params
  const { id } = req.user

  await toggleFavoriteStatus(fileId, id)

  return res.status(200).json({})
}
