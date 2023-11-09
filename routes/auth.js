/**
 * path: api/login
 */

const { Router } = require('express')
const { createUser, renewToken, login } = require('../controllers/auth')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')

const router = Router()

// Create new users:
router.post('/new', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateFields
], createUser)

// Login:
router.post('/', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
  validateFields
], login)

// Renew token:
router.get('/renew', renewToken)

module.exports = router
