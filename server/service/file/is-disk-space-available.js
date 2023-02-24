import { getUsersSpace } from './get-users-space.js'

export const isDiskSpaceAvailable = async (userId, fileSize) => {
  const space = await getUsersSpace(userId)

  if (space + fileSize > 5000000000) {
    throw new Error('there is no free disk space')
  }
  return true
}
