import { useEffect, useRef } from 'react';
import styles from './ContextMenu.module.css';

/**
 * Componente de menú contextual flotante.
 * Se posiciona en la pantalla según `position` y muestra una lista de `options`.
 * Se cierra automáticamente al hacer clic fuera del menú.
 *
 * @param {{ x: number, y: number }} position - Coordenadas absolutas donde se debe mostrar el menú.
 * @param {Array} options - Opciones del menú. Cada opción puede tener:
 *   - label: Texto a mostrar.
 *   - onClick: Función que se ejecuta al hacer clic.
 *   - danger (opcional): Estilo visual para opciones peligrosas como eliminar.
 *   - iconClass (opcional): Clase de ícono para mostrar junto al texto.
 * @param {Function} onClose - Función que se llama para cerrar el menú.
 */
const ContextMenu = ({ position, options, onClose }) => {
  const menuRef = useRef();

  // Cierra el menú si se hace clic fuera del mismo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className={styles.menu}
      style={{ top: position.y, left: position.x }}
    >
      {options.map((option, index) => (
        <div
          key={index}
          className={`${styles.menuItem} ${option.danger ? styles.danger : ''}`}
          onClick={(e) => {
            e.stopPropagation(); // Evita que el clic cierre el menú antes de ejecutar `onClick`
            option.onClick();    // Ejecuta acción asociada
            onClose();           // Cierra el menú
          }}
        >
          <span>{option.label}</span>
          {option.iconClass && (
            <i
              className={`${option.iconClass} ${styles.icon} ${
                option.danger ? styles.dangerIcon : ''
              }`}
            ></i>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
