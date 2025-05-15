import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable'; // Hook para hacer el ítem ordenable (drag and drop)
import { CSS } from '@dnd-kit/utilities';       // Utilidad para convertir transformaciones
import { useDroppable } from '@dnd-kit/core';   // Hook para permitir soltar elementos dentro
import styles from './FolderItem.module.css';
import ContextMenu from '../contextmenu/ContextMenu'; // Menú contextual personalizado
import FolderPopup from '../folderpopup/FolderPopup'; // Ventana emergente que muestra el contenido de la carpeta

/**
 * Componente visual y funcional que representa una carpeta.
 * Admite drag-and-drop, menú contextual, y despliegue de subelementos.
 *
 * @param {string} id - Identificador único de la carpeta.
 * @param {string} name - Nombre visible de la carpeta.
 * @param {string} icon - Ruta al ícono de la carpeta.
 * @param {Array} children - Elementos contenidos dentro de la carpeta (links o subcarpetas).
 */
const FolderItem = ({ id, name, icon, children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para mostrar/ocultar popup
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 }); // Posición del popup al abrir carpeta
  const [contextMenu, setContextMenu] = useState(null); // Estado para mostrar/ocultar menú contextual

  // Hook de @dnd-kit para manejar la lógica sortable del ítem
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  // Hook de @dnd-kit para hacer que el ítem sea zona droppable
  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: `${id}-dropzone`,
  });

  // Estilo de transformación para animaciones del sortable
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Maneja el click en la carpeta: abre o cierra el popup
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPos({ x: rect.right + 10, y: rect.top }); // Calcula posición para el popup
    setIsPopupOpen((prev) => !prev); // Alterna visibilidad
  };

  // Muestra el menú contextual al hacer clic derecho
  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  // Cierra menú contextual
  const closeContextMenu = () => setContextMenu(null);
  // Cierra el popup de la carpeta
  const closePopup = () => setIsPopupOpen(false);

  // Opciones del menú contextual
  const menuOptions = [
    {
      label: 'Agregar marcador',
      onClick: () => console.log('Agregar marcador'),
      iconClass: 'bi bi-plus-circle',
    },
    {
      label: 'Agregar carpeta',
      onClick: () => console.log('Agregar carpeta'),
      iconClass: 'bi bi-folder-plus',
    },
    {
      label: 'Editar nombre',
      onClick: () => console.log('Editar nombre'),
      iconClass: 'bi bi-textarea-t',
    },
    {
      label: 'Eliminar',
      onClick: () => console.log('Eliminar'),
      iconClass: 'bi bi-trash',
      danger: true,
    },
  ];

  return (
    <div
      ref={setNodeRef} // Referencia para sortable
      style={style}    // Aplica transformaciones de dnd-kit
      className={styles.container}
      onContextMenu={handleContextMenu} // Escucha clic derecho
    >
      <div className={styles.floatingItem}>
        <div className={styles.left} onClick={handleClick}>
          <img src={icon} alt={name} className={styles.favicon} />
          <span>{name}</span>
        </div>
        {/* Zona de arrastre visual */}
        <div
          className={styles.dragZone}
          ref={setActivatorNodeRef} // Activador para arrastrar
          {...listeners}           // Listeners de arrastre
        >
          ⋮
        </div>
      </div>

      {/* Popup para mostrar contenido de la carpeta */}
      {isPopupOpen && (
        <FolderPopup
          position={popupPos}
          items={children}
          onClose={closePopup}
        />
      )}

      {/* Menú contextual */}
      {contextMenu && (
        <ContextMenu
          position={contextMenu}
          options={menuOptions}
          onClose={closeContextMenu}
        />
      )}
    </div>
  );
};

export default FolderItem;
