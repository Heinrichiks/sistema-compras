// src/utils/firmasEmail.js
// Firmas de texto plano para correos según la razón social

/**
 * FIRMAS_EMAIL - Objeto con las 3 firmas en texto plano
 * 
 * Cada firma es un string simple con saltos de línea (\n)
 * 
 * Razones sociales disponibles:
 * - Vera: Proveedora Industrial Vera
 * - EMI: Enriquez Maquinados Industriales
 * - FYDE: Maquinados FYDE
 */

export const FIRMAS_EMAIL = {
  // ========================================
  // FIRMA: PROVEEDORA INDUSTRIAL VERA
  // ========================================
  Vera: `

---
ENRIQUE SÁNCHEZ
Compras | Proveedora Industrial Vera

📧 Email: compras@maquinadosenriquez.com
📄 Facturas: cpp@vera-industrial.com
☎️ Oficina: (899) 387-5702
📱 💬 Celular / WhatsApp: (899) 346-1256
---`,

  // ========================================
  // FIRMA: ENRIQUEZ MAQUINADOS INDUSTRIALES
  // ========================================
  EMI: `

---
ENRIQUE SÁNCHEZ
Compras | Enriquez Maquinados Industriales

📧 Email: compras@maquinadosenriquez.com
📄 Facturas: cpp@vera-industrial.com
☎️ Oficina: (899) 387-5702
📱 💬 Celular / WhatsApp: (899) 346-1256
---`,

  // ========================================
  // FIRMA: MAQUINADOS FYDE
  // ========================================
  FYDE: `

---
ENRIQUE SÁNCHEZ
Compras | Maquinados FYDE

📧 Email: compras@maquinadosenriquez.com
📄 Facturas: cpp@vera-industrial.com
☎️ Oficina: (899) 387-5702
📱 💬 Celular / WhatsApp: (899) 346-1256
---`
};

/**
 * Obtiene la firma en texto plano correspondiente según la razón social
 * 
 * @param {string} firma - Puede ser "Vera", "EMI", o "FYDE"
 * @returns {string} Texto plano de la firma correspondiente, o string vacío si no existe
 * 
 * @example
 * const firma = obtenerFirmaEmail("Vera");
 * // Retorna la firma de texto de Vera
 */
export const obtenerFirmaEmail = (firma) => {
  // Validar que la firma existe en el objeto
  if (!firma || !FIRMAS_EMAIL[firma]) {
    console.warn(`Firma "${firma}" no encontrada. Firmas disponibles: Vera, EMI, FYDE`);
    return '';
  }
  
  return FIRMAS_EMAIL[firma];
};

/**
 * Obtiene una lista de todas las firmas disponibles
 * 
 * @returns {Array<string>} Array con los nombres de las firmas disponibles
 * 
 * @example
 * const firmasDisponibles = obtenerFirmasDisponibles();
 * // Retorna: ["Vera", "EMI", "FYDE"]
 */
export const obtenerFirmasDisponibles = () => {
  return Object.keys(FIRMAS_EMAIL);
};

/**
 * Verifica si una firma existe
 * 
 * @param {string} firma - Nombre de la firma a verificar
 * @returns {boolean} true si la firma existe, false en caso contrario
 * 
 * @example
 * if (firmaExiste("Vera")) {
 *   // La firma existe
 * }
 */
export const firmaExiste = (firma) => {
  return firma && FIRMAS_EMAIL.hasOwnProperty(firma);
};