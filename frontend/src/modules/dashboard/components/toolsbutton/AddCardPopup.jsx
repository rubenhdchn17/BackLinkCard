import React, { useState } from 'react';
import styles from './AddCardPopup.module.css';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

/**
 * Componente popup para agregar una nueva "card".
 * Permite ingresar nombre, seleccionar carpetas y enlaces para incluir en la card.
 *
 * Props:
 * - onClose: función para cerrar el popup.
 * - onAdd: función para agregar la card con los datos ingresados.
 * - availableFolders: array con carpetas disponibles para seleccionar.
 * - availableLinks: array con enlaces disponibles para seleccionar.
 */
const AddCardPopup = ({ onClose, onAdd, availableFolders = [], availableLinks = [] }) => {
  // Estado para almacenar el nombre ingresado para la nueva card
  const [cardName, setCardName] = useState('');

  // Estado para mostrar u ocultar la sección de carpetas
  const [showFolders, setShowFolders] = useState(true);

  // Estado para mostrar u ocultar la sección de enlaces
  const [showLinks, setShowLinks] = useState(true);

  // Estado para almacenar las carpetas seleccionadas por el usuario
  const [selectedFolders, setSelectedFolders] = useState([]);

  // Estado para almacenar los enlaces seleccionados por el usuario
  const [selectedLinks, setSelectedLinks] = useState([]);

  /**
   * Alterna la selección de una carpeta.
   * Si la carpeta ya está seleccionada, se deselecciona.
   * Si no está seleccionada, se añade.
   *
   * @param {object} folder - Carpeta a alternar selección.
   */
  const toggleFolder = (folder) => {
    setSelectedFolders((prev) =>
      prev.includes(folder) ? prev.filter((f) => f !== folder) : [...prev, folder]
    );
  };

  /**
   * Alterna la selección de un enlace.
   * Si el enlace ya está seleccionado, se deselecciona.
   * Si no está seleccionado, se añade.
   *
   * @param {object} link - Enlace a alternar selección.
   */
  const toggleLink = (link) => {
    setSelectedLinks((prev) =>
      prev.includes(link) ? prev.filter((l) => l !== link) : [...prev, link]
    );
  };

  /**
   * Maneja el clic en el botón "Add".
   * Valida que se haya ingresado un nombre, llama a la función onAdd con los datos,
   * y luego cierra el popup.
   */
  const handleAdd = () => {
    if (cardName) {
      onAdd({
        name: cardName,
        folders: selectedFolders,
        links: selectedLinks
      });
      onClose();
    }
  };

  return (
    // Capa de fondo semitransparente para el popup
    <div className={styles.popupOverlay} onClick={onClose}>
      {/* Contenedor principal del popup. Detiene la propagación del click para no cerrar al hacer click dentro */}
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        {/* Input para ingresar el nombre de la card */}
        <input
          className={styles.input}
          placeholder="Add card name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
        />

        {/* Sección desplegable para selección de carpetas */}
        <div className={styles.dropdown}>
          <div
            className={styles.dropdownHeader}
            onClick={() => setShowFolders(!showFolders)} // Alterna visibilidad
          >
            <span>Folders</span>
            {showFolders ? <BsChevronUp /> : <BsChevronDown />} {/* Icono acorde al estado */}
          </div>
          <div
            className={styles.linksList}
            style={{
              maxHeight: showFolders ? '160px' : '0', // Animación con max-height para despliegue
              overflow: showFolders ? 'auto' : 'hidden',
              transition: 'max-height 0.3s ease-in-out',
            }}
          >
            {/* Lista de carpetas disponibles */}
            {availableFolders.map((folder) => (
              <label
                key={folder.id}
                className={`${styles.linkItem} ${
                  selectedFolders.includes(folder) ? styles.selected : ''
                }`}
              >
                <span>{folder.name}</span>
                <input
                  type="checkbox"
                  checked={selectedFolders.includes(folder)}
                  onChange={() => toggleFolder(folder)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Sección desplegable para selección de enlaces */}
        <div className={styles.dropdown}>
          <div
            className={styles.dropdownHeader}
            onClick={() => setShowLinks(!showLinks)} // Alterna visibilidad
          >
            <span>Links</span>
            {showLinks ? <BsChevronUp /> : <BsChevronDown />} {/* Icono acorde al estado */}
          </div>
          <div
            className={styles.linksList}
            style={{
              maxHeight: showLinks ? '160px' : '0', // Animación con max-height para despliegue
              overflow: showLinks ? 'auto' : 'hidden',
              transition: 'max-height 0.3s ease-in-out',
            }}
          >
            {/* Lista de enlaces disponibles */}
            {availableLinks.map((link) => (
              <label
                key={link.id}
                className={`${styles.linkItem} ${
                  selectedLinks.includes(link) ? styles.selected : ''
                }`}
              >
                <span>{link.name}</span>
                <input
                  type="checkbox"
                  checked={selectedLinks.includes(link)}
                  onChange={() => toggleLink(link)}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Botones para cancelar o agregar la card */}
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

export default AddCardPopup;
