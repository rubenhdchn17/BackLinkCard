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
 * - items: Array<{ id: string | number, type: 'link' | 'folder', ... }> - Lista de ítems con tipo y datos.
 * - activeId: string | number - ID del ítem que actualmente está siendo arrastrado.
 */
const FreeItemsBlock = ({ id, items, activeId }) => {
  const renderItem = (item) => {
    switch (item.type) {
      case "link":
        return <LinkItem {...item} />;
      case "folder":
        return <FolderItem {...item} />;
      default:
        console.warn(`Tipo de ítem desconocido: ${item.type}`);
        return null;
    }
  };

  return (
    <div className={styles.freeItemsBlock} data-block-id={id}>
      <SortableContext items={items.map((item) => item.id)}>
        {items.map((item) => (
          <DraggableItem key={item.id} id={item.id} activeId={activeId}>
            {renderItem(item)}
          </DraggableItem>
        ))}
      </SortableContext>
    </div>
  );
};

export default FreeItemsBlock;
