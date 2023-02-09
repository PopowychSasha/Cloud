import nodemailer from 'nodemailer'
import EmailTemplates from 'email-templates'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pathToTemplate = path.join(__dirname, './email-templates')

const templateParser = new EmailTemplates({
  views: {
    root: pathToTemplate,
  },
})

export const transport = nodemailer.createTransport({
  host: process.env.TRANSPORT_HOST,
  port: process.env.TRANSPORT_PORT,
  auth: {
    user: process.env.TRANSPORT_USER,
    pass: process.env.TRANSPORT_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
  },
})

export const sendMail = async (details, emailType) => {
  const subject = details.title

  const html = await templateParser.render(emailType, details)
  await transport.sendMail({
    to: details.email,
    subject: subject,
    html: html,
  })
}
