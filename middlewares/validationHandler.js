// ✅ wrap with try/catch since these are sync middlewares
const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      res.status(400)
      const error    = new Error('Validation failed')
      error.errors   = result.error.flatten().fieldErrors
      throw error
    }
    req.body = result.data
    next()
  } catch (err) {
    next(err)  // ✅ pass to errorHandler
  }
}

const validateQuery = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.query)
    if (!result.success) {
      res.status(400)
      const error    = new Error('Validation failed')
      error.errors   = result.error.flatten().fieldErrors
      throw error
    }
    req.query = result.data
    next()
  } catch (err) {
    next(err)  // ✅ pass to errorHandler
  }
}

module.exports = { validate, validateQuery }