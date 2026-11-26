require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Orden = require('./models/Orden');

const app = express();
app.use(cors());
app.use(express.json({ limit: '15mb' }));

const PORT = process.env.PORT || 4000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/techservice_web';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB:', MONGO_URI))
  .catch((err) => console.error('Error conectando a MongoDB:', err));

const tieneSmtpConfigurado = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
const transporter = tieneSmtpConfigurado
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  : null;

// Helper para buscar por idOrden legible o por _id de Mongo
function buscarOrdenPorId(idParam) {
  const filtros = [{ idOrden: idParam }];
  if (mongoose.Types.ObjectId.isValid(idParam)) {
    filtros.push({ _id: idParam });
  }
  return Orden.findOne({ $or: filtros });
}

function construirEnlaceOrden(orden) {
  const codigo = encodeURIComponent(String(orden?.idOrden || orden?._id || '').trim());
  return `${FRONTEND_URL}/?orden=${codigo}`;
}

async function enviarCorreoActualizacionOrden({
  orden,
  asunto,
  tituloBanner,
  mensajePrincipal,
  detalleExtra = '',
}) {
  const destino = String(orden?.correoCliente || '').trim();
  if (!destino) {
    return { enviado: false, motivo: 'sin_correo' };
  }

  const enlaceSeguimiento = construirEnlaceOrden(orden);
  const equipoTexto =
    [orden.tipoEquipo, orden.marca, orden.modelo].filter(Boolean).join(' ') ||
    'Dispositivo registrado';

  const html = `
  <div style="margin:0;padding:24px;background-color:#f3f4f6;font-family:'Segoe UI',Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
      <tr>
        <td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);padding:26px 32px;text-align:left;">
          <span style="display:inline-block;background:rgba(255,255,255,0.18);color:#ffffff;font-size:11px;font-weight:700;letter-spacing:1px;padding:4px 10px;border-radius:999px;text-transform:uppercase;">
            TechService Web
          </span>
          <h1 style="margin:12px 0 4px;color:#ffffff;font-size:21px;font-weight:800;">
            ${tituloBanner}
          </h1>
          <p style="margin:0;color:#dbeafe;font-size:13px;">
            Orden de servicio <strong>#${orden.idOrden}</strong> · Estado: <strong>${orden.estado || 'En Proceso'}</strong>
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:28px 32px;font-size:14px;line-height:1.6;color:#374151;">
          <p style="margin-top:0;">
            Hola <strong>${orden.cliente || 'Cliente'}</strong>,
          </p>
          <p>${mensajePrincipal}</p>

          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px 20px;margin:20px 0;font-size:13px;">
            <p style="margin:0 0 6px;"><strong>Equipo:</strong> ${equipoTexto}</p>
            <p style="margin:0 0 6px;"><strong>Estado actual:</strong> ${orden.estado || 'En Proceso'}</p>
            <p style="margin:0 0 6px;"><strong>Técnico asignado:</strong> ${orden.tecnicoAsignado || '[Sin Asignar]'}</p>
            ${detalleExtra ? `<p style="margin:0;">${detalleExtra}</p>` : ''}
          </div>

          <div style="text-align:center;margin:26px 0;">
            <a href="${enlaceSeguimiento}" target="_blank" rel="noopener noreferrer"
               style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:13px 26px;border-radius:10px;">
              Ver seguimiento en vivo
            </a>
          </div>

          <p style="margin:0;font-size:12px;color:#6b7280;word-break:break-all;">
            Enlace directo: <a href="${enlaceSeguimiento}" style="color:#2563eb;">${enlaceSeguimiento}</a>
          </p>
        </td>
      </tr>

      <tr>
        <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;font-size:11px;color:#6b7280;text-align:center;">
          Este enlace es personal y muestra únicamente el estado de la orden #${orden.idOrden}.<br />
          © 2026 TechService Web — Sistema de Gestión de Talleres
        </td>
      </tr>
    </table>
  </div>`;

  if (!transporter) {
    console.log('[Correo simulación - sin SMTP en .env]', {
      para: destino,
      orden: orden.idOrden,
      asunto,
      enlaceSeguimiento,
    });
    return { enviado: true, modo: 'simulado', enlaceSeguimiento };
  }

  await transporter.sendMail({
    from: `"TechService Web" <${process.env.SMTP_USER}>`,
    to: destino,
    subject: asunto,
    html,
  });

  return { enviado: true, modo: 'smtp', enlaceSeguimiento };
}

// POST /api/notificaciones/invitacion-seguimiento
app.post('/api/notificaciones/invitacion-seguimiento', async (req, res) => {
  const {
    to,
    nombreCliente,
    idOrden,
    equipo,
    descripcionFalla,
    fechaIngreso,
    enlaceSeguimiento,
  } = req.body || {};

  if (!to || !idOrden || !enlaceSeguimiento) {
    return res
      .status(400)
      .json({ ok: false, message: 'Faltan datos para el envío del correo.' });
  }

  const fechaFormateada = new Date(fechaIngreso || Date.now()).toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const html = `
  <div style="margin:0;padding:24px;background-color:#f3f4f6;font-family:'Segoe UI',Arial,sans-serif;color:#111827;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
      <tr>
        <td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);padding:28px 32px;text-align:left;">
          <span style="display:inline-block;background:rgba(255,255,255,0.18);color:#ffffff;font-size:11px;font-weight:700;letter-spacing:1px;padding:4px 10px;border-radius:999px;text-transform:uppercase;">
            TechService Web
          </span>
          <h1 style="margin:12px 0 4px;color:#ffffff;font-size:22px;font-weight:800;">
            ¡Tu equipo ya está en buenas manos!
          </h1>
          <p style="margin:0;color:#dbeafe;font-size:13px;">
            Orden de servicio <strong>#${idOrden}</strong> registrada correctamente
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:28px 32px;font-size:14px;line-height:1.6;color:#374151;">
          <p style="margin-top:0;">
            Hola <strong>${nombreCliente || 'Cliente'}</strong>,
          </p>
          <p>
            Te invitamos a hacer seguimiento en tiempo real de tu dispositivo desde nuestra plataforma web.
            <strong>No necesitas crear cuenta ni contraseña</strong>: tu enlace personal te dará acceso directo y exclusivo a esta orden.
          </p>

          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:16px 20px;margin:20px 0;font-size:13px;">
            <p style="margin:0 0 6px;"><strong>Equipo:</strong> ${equipo || 'Dispositivo registrado'}</p>
            <p style="margin:0 0 6px;"><strong>Fecha y hora de ingreso:</strong> ${fechaFormateada}</p>
            <p style="margin:0;"><strong>Falla reportada:</strong> ${descripcionFalla || 'En revisión técnica'}</p>
          </div>

          <p style="font-size:13px;color:#4b5563;">
            Desde este enlace podrás ver en vivo: el técnico encargado, la mesa de trabajo asignada, el estado del proceso, notas técnicas y las fotografías de diagnóstico.
          </p>

          <div style="text-align:center;margin:28px 0;">
            <a href="${enlaceSeguimiento}" target="_blank" rel="noopener noreferrer"
               style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 28px;border-radius:10px;">
              Ver seguimiento de mi dispositivo
            </a>
          </div>

          <p style="margin:0;font-size:12px;color:#6b7280;word-break:break-all;">
            Si el botón no abre, copia y pega este enlace en tu navegador:<br />
            <a href="${enlaceSeguimiento}" style="color:#2563eb;">${enlaceSeguimiento}</a>
          </p>
        </td>
      </tr>

      <tr>
        <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb;font-size:11px;color:#6b7280;text-align:center;">
          Este enlace es personal y muestra únicamente el estado de la orden #${idOrden}.<br />
          © 2026 TechService Web — Sistema de Gestión de Talleres
        </td>
      </tr>
    </table>
  </div>`;

  if (!transporter) {
    console.log('[Correo simulación - sin SMTP en .env]', {
      para: to,
      orden: idOrden,
      enlaceSeguimiento,
    });
    return res.json({
      ok: true,
      modo: 'simulado',
      to,
      enlaceSeguimiento,
      previewHtml: html,
    });
  }

  try {
    await transporter.sendMail({
      from: `"TechService Web" <${process.env.SMTP_USER}>`,
      to,
      subject: `Seguimiento en vivo de tu equipo — Orden #${idOrden} | TechService Web`,
      html,
    });
    return res.json({ ok: true, modo: 'smtp', to, enlaceSeguimiento });
  } catch (error) {
    console.error('Error enviando correo al cliente:', error);
    return res.status(500).json({ ok: false, message: 'No se pudo enviar el correo.' });
  }
});

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

// GET /api/ordenes/:id -> obtiene una orden específica por idOrden o _id para el portal del cliente
app.get('/api/ordenes/:id', async (req, res) => {
  try {
    const orden = await buscarOrdenPorId(req.params.id);
    if (!orden) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }
    res.json(orden);
  } catch (error) {
    console.error('Error consultando orden por id:', error);
    res.status(500).json({ message: 'Error al consultar la orden' });
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

// PATCH /api/ordenes/:id -> actualiza técnico asignado, diagnóstico, cierre o campos de la orden
app.patch('/api/ordenes/:id', async (req, res) => {
  try {
    const orden = await buscarOrdenPorId(req.params.id);
    if (!orden) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    const seEstabaCerrando =
      Boolean(req.body.cerrada) && !orden.cerrada;

    const camposPermitidos = [
      'tecnicoAsignado',
      'mesaTrabajo',
      'estado',
      'estadoFinal',
      'cerrada',
      'comentariosCierre',
      'garantiaAplicable',
      'montoTotal',
      'seguimiento',
      'repuestosAsignados',
      'diagnostico',
      'detalleDiagnostico',
      'proximosPasos',
      'imagenDiagnostico',
      'adjuntoDiagnostico',
      'adjuntos',
    ];

    for (const campo of camposPermitidos) {
      if (req.body[campo] !== undefined) {
        orden[campo] = req.body[campo];
      }
    }

    await orden.save();

    const seCerroAhora = seEstabaCerrando || Boolean(req.body.cerrada);
    if (seCerroAhora) {
      try {
        await enviarCorreoActualizacionOrden({
          orden,
          asunto: `Orden #${orden.idOrden} finalizada — TechService Web`,
          tituloBanner: '¡Tu orden de servicio ha sido cerrada!',
          mensajePrincipal:
            'Registramos el cierre de tu orden en <strong>TechService Web</strong>. Puedes consultar el resumen final desde tu enlace de seguimiento.',
          detalleExtra: orden.comentariosCierre
            ? `<strong>Comentarios de cierre:</strong> ${orden.comentariosCierre}`
            : '',
        });
      } catch (mailErr) {
        console.error('Error enviando correo de cierre de orden:', mailErr);
      }
    }

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

// POST /api/ordenes/:id/avances -> registra avance del técnico, actualiza estado y notifica por correo
app.post('/api/ordenes/:id/avances', async (req, res) => {
  try {
    const orden = await buscarOrdenPorId(req.params.id);
    if (!orden) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    const nuevoEstado = req.body.estadoOrden || orden.estado;
    const debeEnviarCorreo =
      req.body.enviadoGmail !== false && Boolean(String(orden.correoCliente || '').trim());

    orden.avances.push({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      estadoOrden: nuevoEstado,
      enviadoGmail: debeEnviarCorreo,
      fechaEnvioGmail: debeEnviarCorreo ? new Date() : null,
    });
    orden.estado = nuevoEstado;

    await orden.save();

    if (debeEnviarCorreo) {
      try {
        await enviarCorreoActualizacionOrden({
          orden,
          asunto: `Nuevo avance en tu equipo — Orden #${orden.idOrden} | TechService Web`,
          tituloBanner: 'Hay una novedad en tu reparación',
          mensajePrincipal: `Se registró el avance <strong>${req.body.titulo || 'Actualización técnica'}</strong> en tu orden.`,
          detalleExtra: req.body.descripcion
            ? `<strong>Detalle:</strong> ${req.body.descripcion}`
            : '',
        });
      } catch (mailErr) {
        console.error('Error enviando correo de avance:', mailErr);
      }
    }

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