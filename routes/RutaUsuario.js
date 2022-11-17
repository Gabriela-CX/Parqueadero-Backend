const router = require('express').Router();

const ControladorUsuario = require('../controllers/ControladorUsuario');

router.route('/usuario')
    .get(ControladorUsuario.getAll)
    .post(ControladorUsuario.create);

router.route('/usuario/:id')
    .get(ControladorUsuario.getById)
    .put(ControladorUsuario.update)
    .patch(ControladorUsuario.update);

module.exports = router;