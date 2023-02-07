import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
import authRouter from '../route/auth.js'
import resetPasswordRouter from '../route/reset-password.js'
import fileRouter from '../route/file.js'
import { passport } from '../authentication/passport.js'

export const app = express()
dotenv.config({ path: '../.env' })
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true }))
app.use(cookieParser())
app.use(passport.initialize())

app.use('/api', authRouter)
app.use('/api', resetPasswordRouter)
app.use('/api', fileRouter)

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})
