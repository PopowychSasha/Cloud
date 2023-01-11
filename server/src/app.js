import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
import authRouter from '../route/auth.js'
import resetPasswordRouter from '../route/reset-password.js'
import { passport } from '../authentication/passport.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
app.use(passport.initialize())

app.use('/api', authRouter)
app.use('/api', resetPasswordRouter)

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

app.listen(process.env.PORT, () => {
  console.log(`Server is started on PORT ${process.env.PORT}`)
})
