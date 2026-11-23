require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Orden = require('./models/Orden');

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

const PORT = process.env.PORT || 4000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/techservice_web';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB:', MONGO_URI))
  .catch((err) => console.error('Error conectando a MongoDB:', err));

// Helper para buscar por idOrden legible o por _id de Mongo
function buscarOrdenPorId(idParam) {
  const filtros = [{ idOrden: idParam }];
  if (mongoose.Types.ObjectId.isValid(idParam)) {
    filtros.push({ _id: idParam });
  }
  return Orden.findOne({ $or: filtros });
}

// GET /api/ordenes?search=&estado=&desde=&hasta=
app.get('/api/ordenes', async (req, res) => {
  try {
    const { search, estado, desde, hasta } = req.query;
    const query = {};

    if (search && search.trim()) {
      const term = search.trim();
      query.$or = [
        { idOrden: { $regex: term, $options: 'i' } },
        { cliente: { $regex: term, $options: 'i' } },
      ];
    }

    if (estado && estado !== 'Todas') {
      query.estado = estado;
    }

    if (desde || hasta) {
      query.fechaCreacion = {};
      if (desde) {
        query.fechaCreacion.$gte = new Date(`${desde}T00:00:00.000Z`);
      }
      if (hasta) {
        query.fechaCreacion.$lte = new Date(`${hasta}T23:59:59.999Z`);
      }
    }

    const [ordenes, todas] = await Promise.all([
      Orden.find(query).sort({ fechaCreacion: -1, _id: -1 }),
      Orden.find({}),
    ]);

    const resumen = {
      total: todas.length,
      pendientes: todas.filter((o) => o.estado === 'Pendiente').length,
      enProceso: todas.filter((o) => o.estado === 'En Proceso').length,
      finalizadas: todas.filter((o) => o.estado === 'Finalizada' || o.cerrada === true).length,
    };

    res.json({ ordenes, resumen });
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    res.status(500).json({ message: 'Error al consultar órdenes' });
  }
});

// POST /api/ordenes -> crea una orden nueva desde NuevaOrdenView
app.post('/api/ordenes', async (req, res) => {
  try {
    const idGenerado =
      req.body.idOrden || String(Math.floor(1000 + Math.random() * 9000));

    const estadoRaw = String(req.body.estado || 'En Proceso').trim();
    const estadoNormalizado = estadoRaw.toUpperCase().startsWith('EN PROCESO')
      ? 'En Proceso'
      : ['Pendiente', 'En Proceso', 'Finalizada', 'Cancelada'].includes(estadoRaw)
      ? estadoRaw
      : 'En Proceso';

    const nuevaOrden = await Orden.create({
      idOrden: idGenerado,
      fechaCreacion: req.body.fechaCreacion
        ? new Date(req.body.fechaCreacion)
        : new Date(),
      cliente: req.body.cliente,
      cedulaCliente: req.body.cedulaCliente || '',
      telefonoCliente: req.body.telefonoCliente || '',
      correoCliente: req.body.correoCliente || '',
      tipoEquipo: req.body.tipoEquipo || '',
      marca: req.body.marca || '',
      modelo: req.body.modelo || '',
      numeroSerie: req.body.numeroSerie || '',
      descripcionFalla: req.body.descripcionFalla || '',
      observacionesAccesorios: req.body.observacionesAccesorios || '',
      estado: estadoNormalizado,
      tecnicoAsignado: req.body.tecnicoAsignado || '[Sin Asignar]',
    });

    res.status(201).json(nuevaOrden);
  } catch (error) {
    console.error('Error al crear orden:', error);
    res
      .status(400)
      .json({ message: 'No se pudo guardar la orden', error: error.message });
  }
});

// PATCH /api/ordenes/:id -> actualiza técnico asignado, cierre o campos de la orden
app.patch('/api/ordenes/:id', async (req, res) => {
  try {
    const orden = await buscarOrdenPorId(req.params.id);
    if (!orden) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    const camposPermitidos = [
      'tecnicoAsignado',
      'estado',
      'estadoFinal',
      'cerrada',
      'comentariosCierre',
      'garantiaAplicable',
      'montoTotal',
      'seguimiento',
      'repuestosAsignados',
      'diagnostico',
    ];

    for (const campo of camposPermitidos) {
      if (req.body[campo] !== undefined) {
        orden[campo] = req.body[campo];
      }
    }

    await orden.save();
    res.json(orden);
  } catch (error) {
    console.error('Error actualizando orden:', error);
    res
      .status(400)
      .json({ message: 'No se pudo actualizar la orden', error: error.message });
  }
});

// POST /api/ordenes/:id/mediciones -> guarda lectura de voltaje, RAM y GPU
app.post('/api/ordenes/:id/mediciones', async (req, res) => {
  try {
    const orden = await buscarOrdenPorId(req.params.id);
    if (!orden) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    orden.mediciones.push({
      ...req.body,
      fechaMedicion: new Date(),
    });

    await orden.save();
    res.status(201).json(orden);
  } catch (error) {
    console.error('Error guardando medición:', error);
    res
      .status(400)
      .json({ message: 'No se pudo guardar la medición', error: error.message });
  }
});

// POST /api/ordenes/:id/avances -> registra avance del técnico y actualiza estado
app.post('/api/ordenes/:id/avances', async (req, res) => {
  try {
    const orden = await buscarOrdenPorId(req.params.id);
    if (!orden) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    const nuevoEstado = req.body.estadoOrden || orden.estado;
    orden.avances.push({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      estadoOrden: nuevoEstado,
      enviadoGmail: Boolean(req.body.enviadoGmail),
      fechaEnvioGmail: req.body.enviadoGmail ? new Date() : null,
    });
    orden.estado = nuevoEstado;

    await orden.save();
    res.status(201).json(orden);
  } catch (error) {
    console.error('Error guardando avance:', error);
    res
      .status(400)
      .json({ message: 'No se pudo guardar el avance', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor TechService API corriendo en http://localhost:${PORT}`);
});