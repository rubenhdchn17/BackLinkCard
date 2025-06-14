import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDroppable } from '@dnd-kit/core';
import styles from './FolderItem.module.css';
import ContextMenu from '../contextmenu/ContextMenu';
import FolderPopup from '../folderpopup/FolderPopup';

const FolderItem = ({ id, name, icon, contents = [] }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const [contextMenu, setContextMenu] = useState(null);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [isOver, setIsOver] = useState(false);

  // Detect Ctrl/Cmd key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Control' || e.metaKey) {
        setIsCtrlPressed(true);
      }
    };
    const handleKeyUp = () => {
      setIsCtrlPressed(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const { isOver: droppableIsOver } = useDroppable({ id });

  useEffect(() => {
    setIsOver(droppableIsOver);
  }, [droppableIsOver]);

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const effectiveTransform = isCtrlPressed ? null : transform;
  const effectiveListeners = isCtrlPressed ? {} : listeners;
  const effectiveAttributes = isCtrlPressed ? {} : attributes;

  const style = {
    transform: effectiveTransform ? CSS.Transform.toString(effectiveTransform) : undefined,
    transition,
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPos({ x: rect.right + 10, y: rect.top });
    setIsPopupOpen((prev) => !prev);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => setContextMenu(null);
  const closePopup = () => setIsPopupOpen(false);

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

  const highlightDrop = isOver && isCtrlPressed;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.container} ${highlightDrop ? styles.highlightOnCtrlDrop : ''}`}
      onContextMenu={handleContextMenu}
      {...effectiveAttributes}
    >
      <div className={styles.floatingItem}>
        <div className={styles.left} onClick={handleClick}>
          <img src={icon} alt={name} className={styles.favicon} />
          <span>{name}</span>
        </div>
        <div
          className={styles.dragZone}
          ref={setActivatorNodeRef}
          {...effectiveListeners}
        >
          ⋮
        </div>
      </div>

      {isPopupOpen && (
        <FolderPopup
          position={popupPos}
          folder={{ contents }}
          onClose={closePopup}
        />
      )}

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
