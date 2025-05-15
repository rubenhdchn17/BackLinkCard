import React, { useState, useRef, useEffect } from 'react';
import styles from './ToolsButton.module.css';
import { BsTools } from 'react-icons/bs';
import ToolsMenu from './ToolsMenu';

/**
 * Botón que despliega un menú de herramientas al hacer clic.
 * 
 * Props:
 * - onAddLink: función que se ejecuta al seleccionar "Add Link".
 * - onAddFolder: función que se ejecuta al seleccionar "Add Folder".
 * - onAddCard: función que se ejecuta al seleccionar "Add Card".
 * - onUser: función que se ejecuta al seleccionar "User".
 */
const ToolsButton = ({ onAddLink, onAddFolder, onAddCard, onUser }) => {
  // Estado para saber si el menú está abierto o cerrado
  const [menuOpen, setMenuOpen] = useState(false);
  // Referencia al botón para calcular posición
  const buttonRef = useRef(null);
  // Estado para guardar posición del menú (top y left)
  const [position, setPosition] = useState({ top: 0, left: 0 });

  /**
   * Al hacer click en el botón, calculamos la posición del menú
   * para mostrarlo justo debajo del botón y alternamos su visibilidad.
   */
  const handleButtonClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,  // 8px de margen debajo del botón
        left: rect.left,
      });
    }
    setMenuOpen((prev) => !prev);
  };

  /**
   * Detecta clicks fuera del botón para cerrar el menú automáticamente.
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Botón que abre/cierra el menú */}
      <button
        ref={buttonRef}
        className={styles.toolsButton}
        onClick={handleButtonClick}
      >
        <BsTools size={18} />
      </button>

      {/* Menú de herramientas */}
      {menuOpen && (
        <ToolsMenu
          x={position.left}
          y={position.top}
          onAddLink={() => {
            onAddLink();
            setMenuOpen(false);
          }}
          onAddFolder={() => {
            onAddFolder();
            setMenuOpen(false);
          }}
          onAddCard={() => {
            onAddCard();
            setMenuOpen(false);
          }}
          onUser={() => {
            onUser();
            setMenuOpen(false);
          }}
          onLogout={() => console.log('Logout')}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default ToolsButton;
