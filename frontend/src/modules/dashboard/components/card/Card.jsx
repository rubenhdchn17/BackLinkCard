import styles from "./Card.module.css";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import FolderPopup from "../folderpopup/FolderPopup";
import LinkItem from "../link/LinkItem";
import FolderItem from "../folder/FolderItem";
import DraggableItem from "../board/DraggableItem";
import ContextMenu from "../contextmenu/ContextMenu";

/**
 * Componente que representa una tarjeta (card) que puede contener elementos
 * drag-and-drop (enlaces o carpetas), así como comportarse como un contenedor
 * draggable y droppable usando @dnd-kit.
 *
 * @param {string} id - Identificador único de la tarjeta.
 * @param {string} title - Título que se muestra en el encabezado de la tarjeta.
 * @param {Array} items - Lista de ítems contenidos (links o folders).
 * @param {Function} updateItemsInCard - Función para actualizar los ítems dentro de la tarjeta.
 * @param {string} activeId - ID del ítem que actualmente se está arrastrando.
 */
const Card = ({ id, title, items = [], updateItemsInCard, activeId }) => {
  // Permite que la tarjeta sea un destino de drop
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id });

  // Permite que la tarjeta entera pueda ser arrastrada
  const { attributes, listeners, setNodeRef: setDraggableRef } = useDraggable({ id });

  // Estado para manejar apertura de popups de carpetas
  const [openFolder, setOpenFolder] = useState(null);
  const [folderPosition, setFolderPosition] = useState({ top: 0, left: 0 });

  // Estado para mostrar menú contextual en la tarjeta
  const [contextMenu, setContextMenu] = useState(null);

  // Estilo para indicar visualmente cuando se está haciendo drop sobre la tarjeta
  const dropZoneStyle = {
    backgroundColor: isOver ? "#f0f8ff" : "transparent",
  };

  /**
   * Muestra el popup de una carpeta al hacer clic, calculando su posición.
   */
  const handleFolderClick = (e, folder) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOpenFolder(folder);
    setFolderPosition({
      top: rect.top,
      left: rect.right + 8,
    });
  };

  /**
   * Muestra el menú contextual con opciones al hacer clic derecho.
   */
  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      ref={setDraggableRef}
      className={styles.card}
      onContextMenu={handleContextMenu}
    >
      {/* Encabezado de la tarjeta con drag listeners */}
      <div
        className={styles.cardHeader}
        {...listeners}
        {...attributes}
      >
        <h3>{title}</h3>
      </div>

      {/* Contenedor droppable para ítems dentro de la tarjeta */}
      <div
        ref={setDroppableRef}
        className={styles.cardContent}
        style={dropZoneStyle}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <DraggableItem key={item.id} id={item.id} activeId={activeId}>
              <div className={styles.draggableItemWrapper}>
                {item.type === "link" ? (
                  <LinkItem {...item} />
                ) : (
                  <FolderItem {...item} onClick={(e) => handleFolderClick(e, item)} />
                )}
              </div>
            </DraggableItem>
          ))}
        </SortableContext>
      </div>

      {/* Popup de contenido de carpeta */}
      {openFolder && (
        <FolderPopup
          folder={openFolder}
          position={folderPosition}
          onClose={() => setOpenFolder(null)}
        />
      )}

      {/* Menú contextual de la tarjeta */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          options={[
            { label: "Renombrar", onClick: () => console.log("Renombrar", id) },
            { label: "Eliminar", onClick: () => console.log("Eliminar", id) },
          ]}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};

export default Card;
