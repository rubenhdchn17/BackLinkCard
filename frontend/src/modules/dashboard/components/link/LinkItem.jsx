import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable'; // Hook para hacer el elemento arrastrable y ordenable
import { CSS } from '@dnd-kit/utilities'; // Utilidad para transformar estilos CSS de transformación
import styles from './LinkItem.module.css'; // Estilos CSS específicos para LinkItem
import ContextMenu from "../contextmenu/ContextMenu"; // Menú contextual personalizado

/**
 * Componente que representa un enlace (link) que se puede arrastrar, soltar y abrir.
 * También tiene menú contextual con acciones específicas.
 *
 * @param {string} id - Identificador único para drag and drop.
 * @param {string} name - Nombre o título del enlace.
 * @param {string} icon - URL o path del icono/favicom del enlace.
 * @param {string} url - URL al que apunta el enlace.
 */
const LinkItem = ({ id, name, icon, url }) => {
  // Hook para hacer el item sortable y obtener referencias, estilos y atributos para drag and drop
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  // Estado para controlar la visibilidad y posición del menú contextual
  const [contextMenu, setContextMenu] = useState(null);

  // Estilos inline para la transformación CSS (mover mientras se arrastra)
  const style = {
    transform: CSS.Transform.toString(transform), // transforma la matriz de movimiento en string CSS
    transition, // transición para suavizar animaciones
  };

  // Manejador para abrir el menú contextual en la posición del click derecho
  const handleContextMenu = (e) => {
    e.preventDefault(); // evitar el menú contextual por defecto del navegador
    setContextMenu({ x: e.clientX, y: e.clientY }); // guardar posición para mostrar el menú
  };

  // Cierra el menú contextual
  const closeContextMenu = () => {
    setContextMenu(null);
  };

  // Opciones del menú contextual con iconos y acciones (a implementar)
  const menuOptions = [
    { label: "Copiar", onClick: () => console.log("Copiar link"), iconClass: "bi bi-clipboard" },
    { label: "Editar", onClick: () => console.log("Editar link"), iconClass: "bi bi-pencil" },
    { label: "Eliminar", onClick: () => console.log("Eliminar link"), iconClass: "bi bi-trash", danger: true },
  ];  

  return (
    <div
      ref={setNodeRef} // referencia para dnd-kit
      style={style} // estilos para animación
      className={styles.container} // estilos propios del item
      onContextMenu={handleContextMenu} // evento click derecho
    >
      {/* Enlace real que abre la URL en nueva pestaña */}
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

        {/* Zona para arrastrar el elemento (icono o área específica) */}
        <div
          className={styles.dragZone}
          {...listeners} // listeners para drag events
          {...attributes} // atributos para drag and drop
        />
      </a>

      {/* Menú contextual que se muestra solo si hay contexto */}
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
