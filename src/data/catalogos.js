// src/data/catalogos.js

export const categorias = [
  "Acero al Carbón",
  "Inoxidable",
  "Aleado",
  "Grado Herramienta",
  "Metal",
  "Plástico",
  "Tipo Molde"
];

export const nombrePorCategoria = {
  "Acero al Carbón": ["1018", "A36", "1045"],
  "Inoxidable": ["303", "304", "316", "416", "420", "420 ESR", "440C", "17-4"],
  "Aleado": ["4140T", "4140", "4340T", "8620"],
  "Grado Herramienta": ["A-2", "D-2", "S-7", "H-13", "O-1"],
  "Metal": ["Aluminio 6061", "Aluminio Rectificado", "Latón", "Cobre", "Bronce", "Titanio"],
  "Plástico": ["Delrin Natural", "Delrin Negro", "Nylon Natural", "Nylon Negro", "Teflón"],
  "Tipo Molde": ["P-20"]
};

export const figuras = [
  "Placa",
  "Solera",
  "Redondo",
  "Cuadrado",
  "Hoja",
  "Ángulo",
  "PTR",
  "Tubo",
  "Hexágono"
];

export const acabados = ["CR", "HR", "DCF", "N/A", "GFS", "TPG"];

export const fraccionesComunes = [
  "1/16", "1/8", "3/16", "1/4", "5/16", "3/8", "7/16", "1/2",
  "9/16", "5/8", "11/16", "3/4", "13/16", "7/8", "15/16",
  "1", "1 1/4", "1 1/2", "1 3/4", "2", "2 1/2", "3", "4", "5", "6"
];

export const statusOptions = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'cotizando', label: 'Cotizando' },
  { value: 'comparando', label: 'Comparando' },
  { value: 'ordenado', label: 'Ordenado' },
  { value: 'completado', label: 'Completado' }
];