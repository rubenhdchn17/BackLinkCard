import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './LinkItem.module.css';
import ContextMenu from "../contextmenu/ContextMenu";

const LinkItem = ({ id, name, icon, url, activeId }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const [contextMenu, setContextMenu] = useState(null);

  // Estilo condicional según si se está arrastrando y si Ctrl está presionado
  const style = {
    transform:
      id !== activeId && window.ctrlKeyPressed
        ? undefined // no aplicar transformación visual
        : CSS.Transform.toString(transform),
    transition,
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const menuOptions = [
    { label: "Copiar", onClick: () => console.log("Copiar link"), iconClass: "bi bi-clipboard" },
    { label: "Editar", onClick: () => console.log("Editar link"), iconClass: "bi bi-pencil" },
    { label: "Eliminar", onClick: () => console.log("Eliminar link"), iconClass: "bi bi-trash", danger: true },
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.container}
      onContextMenu={handleContextMenu}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.floatingItem}
      >
        <div className={styles.left}>
          <img src={icon} alt={name} className={styles.favicon} />
          <span>{name}</span>
        </div>
        <div
          className={styles.dragZone}
          {...listeners}
          {...attributes}
        />
      </a>

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

export default LinkItem;
