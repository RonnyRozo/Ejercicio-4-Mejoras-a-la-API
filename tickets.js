// routes/tickets.js
const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketsController');

// Ruta para calcular el subtotal, IVA y total de un ticket por ID
router.get('/:id/calcular-total', ticketsController.calcularTotal);

module.exports = router;