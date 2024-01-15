/*
    Rutas de eventos / Event
    host + /api/event
*/

const { Router } = require('express')
const { fillValidators } = require('../middlewares/fill-validators')
const { validateJWT } = require('../middlewares/validate-jwt')
const { createEvent, getEvents, updateEvents, deleteEvents } = require('../controllers/events')
const { check } = require('express-validator')
const { isDate } = require('../helpers/isDate')
const router = Router()

//Todas deben pasar por la validación del jwt
router.use(validateJWT);

//Todas deben pasar por la validación del jwt r
// Obtener eventos
router.get('/', getEvents)

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria').custom(isDate),
        fillValidators
    ],
    createEvent)

// Actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalización es obligatoria').custom(isDate),
        fillValidators
    ],
    updateEvents)

// Borrar evento
router.delete('/:id', deleteEvents)


module.exports = router

