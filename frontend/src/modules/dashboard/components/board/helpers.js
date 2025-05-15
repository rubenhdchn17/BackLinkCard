/**
 * Busca un ítem por su ID dentro de una lista de ítems que puede contener subítems (como en tarjetas con enlaces o carpetas).
 *
 * @param {Array} items - Lista de ítems, que pueden incluir tarjetas con subítems.
 * @param {string|number} id - ID del ítem a buscar.
 * @returns {Object|null} - Retorna el ítem encontrado o null si no existe.
 */
export const findItemById = (items, id) => {
  for (const item of items) {
    if (item.id === id) return item;
    if ((item.items || []).length) {
      const found = item.items.find((i) => i.id === id);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Determina la ubicación de un ítem dentro de una lista de ítems que puede contener subítems.
 *
 * @param {Array} items - Lista de ítems de primer nivel, como tarjetas o bloques libres.
 * @param {string|number} id - ID del ítem a localizar.
 * @returns {[Object|null, number]} - Retorna una tupla donde el primer valor es el bloque contenedor 
 *                                    y el segundo es el índice dentro de ese bloque. Si no se encuentra, retorna [null, -1].
 */
export const findItemLocation = (items, id) => {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.id === id) return [item, i];
    if (item.items?.length) {
      const innerIndex = item.items.findIndex((i) => i.id === id);
      if (innerIndex !== -1) return [item, innerIndex];
    }
  }
  return [null, -1];
};

/**
 * Distribuye una lista de ítems en un número fijo de columnas, alternando su posición.
 *
 * @param {Array} items - Lista de ítems a distribuir.
 * @param {number} columns - Número de columnas a utilizar. Por defecto es 5.
 * @returns {Array[]} - Arreglo de columnas, donde cada columna es un arreglo de ítems.
 */
export const getColumns = (items, columns = 5) => {
  const colArray = Array.from({ length: columns }, () => []);
  items.forEach((item, index) => {
    colArray[index % columns].push(item);
  });
  return colArray;
};
