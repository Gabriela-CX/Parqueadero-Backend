const router = require('express').Router();

const ControladorSuscripcion = require('../controllers/ControladorSuscripcion');

router.route('/suscripcion')
    .get(ControladorSuscripcion.getAll)
    .post(ControladorSuscripcion.create);

router.route('/suscripcion/:id')
    .get(ControladorSuscripcion.getById)
    .put(ControladorSuscripcion.update)
    .patch(ControladorSuscripcion.update);

module.exports = router;