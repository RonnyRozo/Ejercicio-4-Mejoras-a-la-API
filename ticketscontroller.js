// controllers/ticketsController.js
const Ticket = require('../models/Ticket');
const Articulo = require('../models/Articulo');

// Función para calcular el subtotal, IVA y total de un ticket por ID
exports.calcularTotal = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await Ticket.findById(ticketId).populate('articulos', 'nombre precio');

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket no encontrado.' });
    }

    // Calcular el subtotal sumando los precios de los artículos
    const subtotal = ticket.articulos.reduce((acc, articulo) => acc + articulo.precio, 0);

    // Calcular el IVA (porcentaje fijo o dinámico según tu lógica)
    const iva = subtotal * 0.16; // Ejemplo: 16% de IVA

    // Calcular el total sumando el subtotal y el IVA
    const total = subtotal + iva;

    res.json({ subtotal, iva, total });
  } catch (error) {
    res.status(500).json({ error: 'Error al calcular los totales del ticket.' });
  }
}