const router = require('express').Router();

const ControladorVehiculo = require('../controllers/ControladorVehiculo');

router.route('/vehiculo')
    .get(ControladorVehiculo.getAll)
    .post(ControladorVehiculo.create);

router.route('/vehiculo/:id')
    .get(ControladorVehiculo.getById)
    .put(ControladorVehiculo.update)
    .patch(ControladorVehiculo.update);

module.exports = router;