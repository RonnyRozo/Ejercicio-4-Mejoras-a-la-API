// controllers/ticketsController.js

// Función para agregar un artículo a un ticket y actualizar existencias
exports.agregarArticulo = async (req, res) => {
    const { ticketId, articuloId, cantidad } = req.body;
  
    try {
      const ticket = await Ticket.findById(ticketId);
      const articulo = await Articulo.findById(articuloId);
  
      if (!ticket || !articulo) {
        return res.status(404).json({ error: 'Ticket o artículo no encontrado.' });
      }
  
      if (articulo.existencias < cantidad) {
        return res.status(400).json({ error: 'No hay suficientes existencias de este artículo.' });
      }
  
      // Agregar el artículo al ticket
      ticket.articulos.push(articuloId);
      await ticket.save();
  
      // Actualizar las existencias del artículo
      articulo.existencias -= cantidad;
      await articulo.save();
  
      res.json({ message: 'Artículo agregado al ticket con éxito.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar el artículo al ticket.' });
    }
  }
  
  // Función para eliminar un artículo de un ticket y actualizar existencias
  exports.eliminarArticulo = async (req, res) => {
    const { ticketId, articuloId, cantidad } = req.body;
  
    try {
      const ticket = await Ticket.findById(ticketId);
      const articulo = await Articulo.findById(articuloId);
  
      if (!ticket || !articulo) {
        return res.status(404).json({ error: 'Ticket o artículo no encontrado.' });
      }
  
      // Eliminar el artículo del ticket
      ticket.articulos = ticket.articulos.filter(id => id.toString() !== articuloId.toString());
      await ticket.save();
  
      // Restaurar las existencias del artículo
      articulo.existencias += cantidad;
      await articulo.save();
  
      res.json({ message: 'Artículo eliminado del ticket con éxito.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el artículo del ticket.' });
    }
  }