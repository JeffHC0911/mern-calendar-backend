/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();
const { validateJWT } = require('../middlewares/validate-jwt');

const { fillValidators } = require('../middlewares/fill-validators');
const { createUser, loginUser, renewToken } = require('../controllers/auth');



router.post(
    '/new',
    [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        fillValidators
    ],
    createUser)

router.post(
    '/',
    [ //middlewares
        check('email', 'El email debe ser obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        fillValidators
    ],
    loginUser)

router.get('/renew', validateJWT ,renewToken)


module.exports = router;