import crypto from 'crypto'

export const hash = (string) =>
  crypto.createHash('sha256').update(string).digest('hex')

export const compare = (hash, string) => {
  const hashString = crypto.createHash('sha256').update(string).digest('hex')
  return hashString === hash
}
