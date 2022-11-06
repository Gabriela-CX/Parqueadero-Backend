const router = require('express').Router();

const ControladorTiquete = require('../controllers/ControladorTiquete');

router.route('/tiquete')
    .get(ControladorTiquete.getAll)
    .post(ControladorTiquete.create);

router.route('/tiquete/:id')
    .get(ControladorTiquete.getById)
    .put(ControladorTiquete.update)
    .patch(ControladorTiquete.update);

module.exports = router;