import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    file.name = uuidv4()
    cb(null, 'files')
  },
  filename(req, file, cb) {
    cb(null, `${file.name}`)
  },
})

export default multer({ storage })
