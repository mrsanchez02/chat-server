
/**
 * @api {post} /auth/login Login
 */

const { Router } = require('express');

const router = Router();

// Create new users:
router.post('/new', (req, res) => {
  res.json({
    ok: true,
    msg: 'Register'
  })
})

// Login:
router.post('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'Login'
  })
})

router.get('/renew', (req, res) => {
  res.json({
    ok: true,
    msg: 'Renew'
  })
})

module.exports = router;