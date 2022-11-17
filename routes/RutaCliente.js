const router = require('express').Router();

const ControladorCliente = require('../controllers/ControladorCliente');

router.route('/cliente')
    .get(ControladorCliente.getAll)
    .post(ControladorCliente.create);

router.route('/cliente/:id')
    .get(ControladorCliente.getById)
    .put(ControladorCliente.update)
    .patch(ControladorCliente.update);

module.exports = router;