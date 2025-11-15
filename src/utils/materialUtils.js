// src/utils/materialUtils.js

export const obtenerCamposVisibles = (figura) => {
  if (!figura) return { 
    mostrarEspesor: false, 
    mostrarDiametro: false, 
    mostrarAncho: false, 
    mostrarLargo: false 
  };

  switch (figura.toLowerCase()) {
    case "redondo":
      return { mostrarEspesor: false, mostrarDiametro: true, mostrarAncho: false, mostrarLargo: true };
    case "placa":
    case "solera":
    case "hoja":
    case "ángulo":
    case "ptr":
      return { mostrarEspesor: true, mostrarDiametro: false, mostrarAncho: true, mostrarLargo: true };
    case "cuadrado":
    case "hexágono":
      return { mostrarEspesor: true, mostrarDiametro: false, mostrarAncho: false, mostrarLargo: true };
    case "tubo":
      return { mostrarEspesor: true, mostrarDiametro: true, mostrarAncho: false, mostrarLargo: true };
    default:
      return { mostrarEspesor: false, mostrarDiametro: false, mostrarAncho: false, mostrarLargo: false };
  }
};

export const construirDescripcionMaterial = (solicitud) => {
  const desc = [];
  
  if (solicitud.categoria) desc.push(solicitud.categoria);
  if (solicitud.nombre) desc.push(solicitud.nombre);
  if (solicitud.figura) desc.push(solicitud.figura);
  if (solicitud.acabado) desc.push(`Acabado: ${solicitud.acabado}`);
  
  if (solicitud.espesorFraccion || solicitud.espesorDecimal) {
    const esp = solicitud.espesorFraccion || solicitud.espesorDecimal;
    desc.push(`Espesor: ${esp}`);
  }
  if (solicitud.diametroFraccion || solicitud.diametroDecimal) {
    const dia = solicitud.diametroFraccion || solicitud.diametroDecimal;
    desc.push(`Ø: ${dia}`);
  }
  if (solicitud.anchoFraccion || solicitud.anchoDecimal) {
    const ancho = solicitud.anchoFraccion || solicitud.anchoDecimal;
    desc.push(`Ancho: ${ancho}`);
  }
  if (solicitud.largoFraccion || solicitud.largoDecimal) {
    const largo = solicitud.largoFraccion || solicitud.largoDecimal;
    desc.push(`Largo: ${largo}`);
  }
  
  return desc.join(' - ') || 'Sin especificaciones';
};

export const getStatusColor = (status) => {
  const colors = {
    pendiente: 'badge-pendiente',   // ahora devuelve clase CSS definida arriba
    cotizando: 'badge-cotizando',
    comparando: 'badge-comparando',
    ordenado: 'badge-ordenado',
    completado: 'badge-completado'
  };
  return colors[status] || 'badge-completado';
};