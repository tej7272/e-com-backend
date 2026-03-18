const jwt = require('jsonwebtoken')

const generateAccessToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15m' }
  )
}

const generateRefreshToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  )
}

const setTokenCookies = (res, refreshToken) => {

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',        
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge:   7 * 24 * 60 * 60 * 1000
  })
}

const clearTokenCookies = (res) => {
  const options = {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',       
    ameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',  
  }
  res.clearCookie('refreshToken', options)
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  setTokenCookies,
  clearTokenCookies,
}