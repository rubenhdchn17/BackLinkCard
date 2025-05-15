import React from 'react';
import styles from './ToolsMenu.module.css';
import {
  BsPaperclip,
  BsFolderPlus,
  BsPlusSquare,
  BsPerson,
  BsPower
} from 'react-icons/bs';

/**
 * Menú desplegable de herramientas que se posiciona
 * en la coordenada (x, y) y ejecuta funciones según
 * la opción seleccionada.
 * 
 * Props:
 * - x, y: coordenadas para posicionar el menú (estilo absolute).
 * - onAddLink: función para la acción "Add link".
 * - onAddFolder: función para la acción "Add folder".
 * - onAddCard: función para la acción "Add card".
 * - onUser: función para la acción "User".
 * - onLogout: función para la acción "Log out".
 * - onClose: función para cerrar el menú (no usada aquí pero puede ser útil).
 */
const ToolsMenu = ({ x, y, onAddLink, onAddFolder, onAddCard, onUser, onLogout, onClose }) => {
  return (
    <div
      className={styles.menu}
      style={{ top: y, left: x }}
      onMouseDown={(e) => e.stopPropagation()} // Evita que clicks cierren el menú prematuramente
    >
      <div className={styles.menuItem} onClick={onAddLink}>
        <BsPaperclip className={styles.icon} />
        <span>Add link</span>
      </div>

      <div className={styles.menuItem} onClick={onAddFolder}>
        <BsFolderPlus className={styles.icon} />
        <span>Add folder</span>
      </div>

      <div className={styles.menuItem} onClick={onAddCard}>
        <BsPlusSquare className={styles.icon} />
        <span>Add card</span>
      </div>

      <div className={styles.menuItem} onClick={onUser}>
        <BsPerson className={styles.icon} />
        <span>User</span>
      </div>

      <div className={`${styles.menuItem} ${styles.logout}`} onClick={onLogout}>
        <BsPower className={styles.icon} />
        <span>Log out</span>
      </div>
    </div>
  );
};

export default ToolsMenu;
