const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const accountRoutes = require('./accounts')

router.use('/users', userRoutes);
router.use('/account',accountRoutes)

module.exports = router