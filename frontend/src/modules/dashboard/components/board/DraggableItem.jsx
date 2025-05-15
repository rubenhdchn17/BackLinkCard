// Importamos los hooks necesarios de @dnd-kit para que el componente sea arrastrable y pueda recibir ítems soltados.
import { useDraggable, useDroppable } from "@dnd-kit/core";
import styles from "./DraggableBoard.module.css";

/**
 * Componente DraggableItem
 * 
 * Este componente envuelve cualquier elemento (como una tarjeta, carpeta o enlace)
 * y lo convierte en un item tanto arrastrable como droppable.
 * 
 * Props:
 * - id: string | number - Identificador único del item, necesario para el sistema de drag and drop.
 * - activeId: string | number - ID del elemento que actualmente se está arrastrando.
 * - children: ReactNode - Contenido visual del item, usualmente una tarjeta (Card) o bloque libre.
 */
const DraggableItem = ({ id, activeId, children }) => {
  // Hook para hacer que el elemento pueda ser arrastrado
  const { attributes, listeners, setNodeRef: setDraggableRef } = useDraggable({ id });

  // Hook para permitir que otros items puedan soltarse sobre este elemento
  const { setNodeRef: setDroppableRef } = useDroppable({ id });

  // Determina si este es el elemento que está siendo arrastrado actualmente
  const isActive = id === activeId;

  return (
    <div
      // Se asignan ambas referencias: arrastrable y droppable al mismo nodo
      ref={(node) => {
        setDraggableRef(node);
        setDroppableRef(node);
      }}
      {...attributes} // Atributos necesarios para el drag (como role, tabIndex)
      className={`${styles.itemWrapper} ${isActive ? styles.hidden : ""}`} // Oculta el elemento si está siendo arrastrado (para evitar duplicado visual)
    >
      {children}
    </div>
  );
};

export default DraggableItem;
