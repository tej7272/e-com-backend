const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const sendEmail = async ({ to, subject, html }) => {
  try {
    const result = await transporter.sendMail({
      from:    `"B-nexora" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    })
    return result
  } catch (error) {
    console.error('Email error:', error.message)
    throw error
  }
}

module.exports = sendEmail