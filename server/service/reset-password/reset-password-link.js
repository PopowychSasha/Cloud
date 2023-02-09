export const resetPasswordLink = (resetPasswordToken) =>
  `http://${process.env.HOST}:${process.env.CLIENT_PORT}/reset_password/${resetPasswordToken}`
