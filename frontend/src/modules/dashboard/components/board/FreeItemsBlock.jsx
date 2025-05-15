import { SortableContext } from "@dnd-kit/sortable";
import DraggableItem from "./DraggableItem";
import LinkItem from "../link/LinkItem";
import FolderItem from "../folder/FolderItem";
import styles from "./DraggableBoard.module.css";

/**
 * Componente FreeItemsBlock
 *
 * Representa un bloque que contiene ítems sueltos (enlaces y carpetas) que no están dentro de una tarjeta.
 * Los ítems pueden ser arrastrados y reordenados entre sí.
 *
 * Props:
 * - id: string | number - Identificador único del bloque.
 * - items: Array - Lista de ítems contenidos en el bloque. Cada ítem debe tener un id y un type ("link" o "folder").
 * - activeId: string | number - ID del ítem que actualmente está siendo arrastrado.
 */
const FreeItemsBlock = ({ id, items, activeId }) => {
  return (
    <div className={styles.freeItemsBlock}>
      {/* Permite el ordenamiento de los ítems usando sus IDs */}
      <SortableContext items={items.map((i) => i.id)}>
        {items.map((item) => (
          <DraggableItem key={item.id} id={item.id} activeId={activeId}>
            {/* Renderiza el componente adecuado según el tipo de ítem */}
            {item.type === "link" ? <LinkItem {...item} /> : <FolderItem {...item} />}
          </DraggableItem>
        ))}
      </SortableContext>
    </div>
  );
};

export default FreeItemsBlock;
