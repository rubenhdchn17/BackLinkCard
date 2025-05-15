import ReactDOM from 'react-dom'; // Para renderizar el popup en un portal fuera del flujo principal del DOM
import styles from './FolderPopup.module.css'; // Estilos CSS del popup
import LinkItem from '../link/LinkItem'; // Componente que renderiza enlaces individuales

/**
 * Componente visual que representa el contenido de una carpeta como popup flotante.
 * Se muestra en una posición absoluta y usa React Portal para salir del flujo del layout.
 *
 * @param {Object} position - Coordenadas (x, y) donde debe aparecer el popup.
 * @param {Array} items - Lista de elementos dentro de la carpeta (principalmente links).
 * @param {Function} onClose - Función que se llama al cerrar el popup.
 */
const FolderPopup = ({ position, items = [], onClose }) => {
  // El contenido visual del popup
  const popup = (
    <div
      className={styles.popup}
      style={{
        top: `${position.y}px`,    // Posición vertical absoluta
        left: `${position.x}px`,   // Posición horizontal absoluta
        position: 'absolute'       // Se coloca flotando en la página
      }}
    >
      {/* Encabezado del popup con botón de cierre */}
      <div className={styles.header}>
        <span>Contenido</span>
        <button onClick={onClose} className={styles.closeBtn}>×</button>
      </div>

      {/* Contenido principal: lista de enlaces o mensaje si está vacío */}
      <div className={styles.content}>
        {items.length === 0 ? (
          <p className={styles.empty}>No hay enlaces</p>
        ) : (
          items.map((item) =>
            item.type === 'link' ? (
              <LinkItem key={item.id} {...item} />
            ) : null
          )
        )}
      </div>
    </div>
  );

  // Renderiza el popup en el nodo con id="popup-root", que debe estar en el HTML principal
  return ReactDOM.createPortal(popup, document.getElementById('popup-root'));
};

export default FolderPopup;
