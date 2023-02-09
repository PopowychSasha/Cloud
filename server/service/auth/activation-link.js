export const activationLink = (email_confirmation_token) =>
  `http://${process.env.HOST}:${process.env.CLIENT_PORT}/activation/${email_confirmation_token}`
