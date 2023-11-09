const { validationResult } = require('express-validator')
const { response, request } = require('express')

const validateFields = (req = request, res = response, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped()
    })
  }

  next();
}

module.exports = {
  validateFields
}
