import React, { useState } from 'react';
import styles from './AddLinkPopup.module.css';

/**
 * Popup para agregar un nuevo enlace (link).
 *
 * Props:
 * - onClose: función para cerrar el popup.
 * - onAdd: función para agregar el link con los datos ingresados.
 */
const AddLinkPopup = ({ onClose, onAdd }) => {
  // Estado para el nombre del link
  const [name, setName] = useState('');
  // Estado para la URL del link
  const [url, setUrl] = useState('');

  /**
   * Maneja el clic en el botón "Add".
   * Valida que se haya ingresado nombre y URL,
   * llama a onAdd con el nuevo link y cierra el popup.
   */
  const handleAdd = () => {
    if (name && url) {
      onAdd({ name, url });
      onClose();
    }
  };

  return (
    // Fondo oscuro que cierra el popup al hacer click
    <div className={styles.popupOverlay} onClick={onClose}>
      {/* Contenedor del popup, detiene propagación para que no se cierre con clicks internos */}
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        {/* Input para nombre del link */}
        <input
          className={styles.input}
          placeholder="Add link name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* Input para URL */}
        <input
          className={styles.input}
          placeholder="Url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        {/* Botones de cancelar y agregar */}
        <div className={styles.buttons}>
          <span className={styles.cancel} onClick={onClose}>
            Cancel
          </span>
          <button className={styles.add} onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLinkPopup;
