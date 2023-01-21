import { registerUser } from '../service/auth/register-user.js'
import { setTokens } from '../service/auth/set-tokens.js'
import { findUserByEmailAndPassword } from '../service/auth/find-user-by-email-and-password.js'

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    await registerUser(name, email, password)

    res.status(201).json({})
  } catch (err) {
    next(err)
  }
}

export const authenticationController = async (req, res, next) => {
  try {
    const { email, password } = req.body
    let user = await findUserByEmailAndPassword(email, password)

    if (!user) {
      return res.status(401).json({ message: 'email or password is incorrect' })
    }

    const { accessToken, refreshToken } = await setTokens(user)

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly`)
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

export const protectedController = (req, res, next) => {
  try {
    return res
      .status(200)
      .json(`My name is ${req.user.name}, email is ${req.user.email}`)
  } catch (err) {
    next(err)
  }
}
