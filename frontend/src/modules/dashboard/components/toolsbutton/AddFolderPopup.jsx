import React, { useState } from 'react';
import styles from './AddFolderPopup.module.css';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

/**
 * Popup para agregar una nueva carpeta (folder).
 * Permite ingresar el nombre de la carpeta y seleccionar bookmarks (links) para incluir.
 *
 * Props:
 * - onClose: función para cerrar el popup.
 * - onAdd: función para agregar la carpeta con sus datos.
 * - availableLinks: array con enlaces/bookmarks disponibles para seleccionar.
 */
const AddFolderPopup = ({ onClose, onAdd, availableLinks = [] }) => {
  // Estado para el nombre de la carpeta a crear
  const [folderName, setFolderName] = useState('');

  // Estado para mostrar u ocultar la lista de links disponibles
  const [showLinks, setShowLinks] = useState(true);

  // Estado para almacenar los links seleccionados para la carpeta
  const [selectedLinks, setSelectedLinks] = useState([]);

  /**
   * Alterna la selección de un link.
   * Si ya estaba seleccionado, lo quita; si no, lo añade.
   *
   * @param {object} link - link/bookmark a alternar selección.
   */
  const toggleLink = (link) => {
    setSelectedLinks((prev) =>
      prev.includes(link)
        ? prev.filter((l) => l !== link)
        : [...prev, link]
    );
  };

  /**
   * Maneja el clic en el botón "Add".
   * Valida que se haya ingresado un nombre,
   * llama a la función onAdd con la carpeta creada,
   * y cierra el popup.
   */
  const handleAdd = () => {
    if (folderName) {
      onAdd({ name: folderName, links: selectedLinks });
      onClose();
    }
  };

  return (
    // Fondo semitransparente que al hacer click cierra el popup
    <div className={styles.popupOverlay} onClick={onClose}>
      {/* Contenedor del popup, detiene la propagación para que no se cierre al click dentro */}
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        {/* Input para ingresar el nombre de la carpeta */}
        <input
          className={styles.input}
          placeholder="Add folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />

        {/* Dropdown para seleccionar bookmarks */}
        <div className={styles.dropdown}>
          <div
            className={styles.dropdownHeader}
            onClick={() => setShowLinks(!showLinks)} // Toggle para mostrar/ocultar links
          >
            <span>Bookmarks</span>
            {showLinks ? <BsChevronUp /> : <BsChevronDown />} {/* Icono acorde al estado */}
          </div>

          {/* Lista de links solo visible si showLinks es true */}
          {showLinks && (
            <div className={`${styles.linksListWrapper} ${showLinks ? styles.show : ''}`}>
              <div className={styles.linksList}>
                {availableLinks.map((link) => (
                  <label
                    key={link.id}
                    className={`${styles.linkItem} ${
                      selectedLinks.includes(link) ? styles.selected : ''
                    }`}
                  >
                    {/* Contenido del link: icono + nombre */}
                    <div className={styles.linkContent}>
                      <img src={link.icon} alt="icon" className={styles.linkIcon} />
                      <span>{link.name}</span>
                    </div>

                    {/* Checkbox para seleccionar/deseleccionar link */}
                    <input
                      type="checkbox"
                      checked={selectedLinks.includes(link)}
                      onChange={() => toggleLink(link)}
                      className={styles.checkbox}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Botones para cancelar o agregar la carpeta */}
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

export default AddFolderPopup;
