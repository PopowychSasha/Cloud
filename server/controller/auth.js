import { registerUser } from '../service/auth/register-user.js'
import { setTokens } from '../service/auth/set-tokens.js'
import { findUserByEmailAndPassword } from '../service/auth/find-user-by-email-and-password.js'
import { newAccessToken } from '../service/auth/new-access-token.js'
import jwt from 'jsonwebtoken'
import { removeRefreshToken } from '../service/auth/remove-refresh-token.js'

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body
  try {
    await registerUser(name, email, password)
  } catch (err) {
    return next(err)
  }
  res.status(201).json({})
}

export const authenticationController = async (req, res, next) => {
  const { email, password } = req.body
  try {
    let user = await findUserByEmailAndPassword(email, password)

    if (!user) {
      return res.status(403).json({ message: 'email or password is incorrect' })
    }

    const { accessToken, refreshToken } = await setTokens(user)

    res.cookie('refreshToken', refreshToken, { httpOnly: true })

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role_id: user.role_id,
      accessToken,
    })
  } catch (err) {
    next(err)
  }
}

export const refreshAccessToken = async (req, res, next) => {
  try {
    const accessToken = await newAccessToken(req.cookies.refreshToken)
    if (accessToken) {
      res.status(200).json({ accessToken })
    } else {
      res.status(401).json('Unauthorized')
    }
  } catch (err) {
    next(err)
  }
}

export const getUserInfo = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(' ')[1]
  try {
    const user = jwt.verify(accessToken, process.env.TOKEN_KEY)
    return res.status(200).json(user)
  } catch (err) {
    res.status(200).json(false)
  }
}

export const logout = async (req, res, next) => {
  const { refreshToken } = req.cookies
  try {
    await removeRefreshToken(refreshToken)
  } catch (err) {
    return next(err)
  }
  res.clearCookie('refreshToken')
  res.json(req.cookies)
}
