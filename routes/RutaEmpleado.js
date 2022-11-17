const router = require('express').Router();

const ControladorEmpleado = require('../controllers/ControladorEmpleado');

router.route('/empleado')
    .get(ControladorEmpleado.getAll)
    .post(ControladorEmpleado.create);

router.route('/empleado/:id')
    .get(ControladorEmpleado.getById)
    .put(ControladorEmpleado.update)
    .patch(ControladorEmpleado.update);

module.exports = router;