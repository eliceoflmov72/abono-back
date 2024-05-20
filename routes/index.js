const router = require('express').Router();

// Usar las rutas definidas en `locations.js`
router.use('/locations', require('./api/locations'));

// Usar las rutas definidas en `generic_bus.js`
router.use('/generic_bus', require('./api/generic_bus'));

module.exports = router;
