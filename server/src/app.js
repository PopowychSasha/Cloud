import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from '../route/auth.js'
import resetPasswordRouter from '../route/reset-password.js'
import fileRouter from '../route/file.js'
import { passport } from '../authentication/passport.js'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true }))
app.use(cookieParser())
app.use(passport.initialize())

app.use(express.static('build'))

app.use('/api', authRouter)
app.use('/api', resetPasswordRouter)
app.use('/api', fileRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})
