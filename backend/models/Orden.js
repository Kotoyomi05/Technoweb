const mongoose = require('mongoose');

const avanceSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    estadoOrden: {
      type: String,
      default: 'En Proceso',
    },
    enviadoGmail: { type: Boolean, default: false },
    fechaEnvioGmail: { type: Date, default: null },
  },
  { timestamps: true }
);

const medicionSchema = new mongoose.Schema(
  {
    voltajeMedido: { type: Number, default: null },
    voltajeNominal: { type: Number, default: null },
    diagnosticoVoltaje: { type: String, default: '' },
    estadoRam: { type: String, default: '' },
    detalleRam: { type: String, default: '' },
    estadoGpu: { type: String, default: '' },
    detalleGpu: { type: String, default: '' },
    notasTecnico: { type: String, default: '' },
    fechaMedicion: { type: Date, default: Date.now },
  },
  { _id: true }
);

const seguimientoSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.Mixed, default: '' },
    fecha: { type: mongoose.Schema.Types.Mixed, default: null },
    titulo: { type: String, default: '' },
    accion: { type: String, default: '' },
    responsable: { type: String, default: '' },
    notaTecnica: { type: String, default: '' },
    proximosPasos: { type: String, default: '' },
    adjuntos: { type: [mongoose.Schema.Types.Mixed], default: [] },
  },
  { _id: true }
);

const ordenSchema = new mongoose.Schema(
  {
    idOrden: { type: String, required: true, unique: true, trim: true },
    fechaCreacion: { type: Date, required: true, default: Date.now },
    cliente: { type: String, required: true, trim: true },
    cedulaCliente: { type: String, trim: true, default: '' },
    telefonoCliente: { type: String, trim: true, default: '' },
    correoCliente: { type: String, trim: true, default: '' },
    ubicacionCliente: { type: String, trim: true, default: '' },
    direccionCliente: { type: String, trim: true, default: '' },
    tipoEquipo: { type: String, trim: true, default: '' },
    marca: { type: String, trim: true, default: '' },
    modelo: { type: String, trim: true, default: '' },
    numeroSerie: { type: String, trim: true, default: '' },
    descripcionFalla: { type: String, trim: true, default: '' },
    observacionesAccesorios: { type: String, trim: true, default: '' },
    estado: {
      type: String,
      trim: true,
      default: 'En Proceso',
    },
    estadoFinal: {
      type: String,
      trim: true,
      default: '',
    },
    cerrada: {
      type: Boolean,
      default: false,
    },
    comentariosCierre: {
      type: String,
      trim: true,
      default: '',
    },
    garantiaAplicable: {
      type: String,
      trim: true,
      default: '',
    },
    montoTotal: {
      type: Number,
      default: 0,
    },
    diagnostico: {
      type: String,
      trim: true,
      default: '',
    },
    detalleDiagnostico: {
      type: String,
      trim: true,
      default: '',
    },
    proximosPasos: {
      type: String,
      trim: true,
      default: '',
    },
    imagenDiagnostico: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    adjuntoDiagnostico: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    adjuntos: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    repuestosAsignados: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    tecnicoAsignado: { type: String, trim: true, default: '[Sin Asignar]' },
    mesaTrabajo: { type: String, trim: true, default: '' },
    seguimiento: [seguimientoSchema],
    avances: [avanceSchema],
    mediciones: [medicionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Orden', ordenSchema);