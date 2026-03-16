// utils/sendEmail.js
const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmail = async ({ to, subject, html }) => {
  try {
    await resend.emails.send({
      from:    'b-nexora <onboarding@resend.dev>',
      to,
      subject,
      html,
    })
  } catch (error) {
    console.error('Email failed:', error.message)
    throw error
  }
}

module.exports = sendEmail