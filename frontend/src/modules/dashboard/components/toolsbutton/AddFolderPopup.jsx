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
  const [folderName, setFolderName] = useState('');
  const [showLinks, setShowLinks] = useState(true);
  const [selectedLinks, setSelectedLinks] = useState([]);

  const toggleLink = (link) => {
    setSelectedLinks((prev) =>
      prev.includes(link) ? prev.filter((l) => l !== link) : [...prev, link]
    );
  };

  const handleAdd = () => {
    if (folderName) {
      onAdd({ name: folderName, links: selectedLinks });
      onClose();
    }
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <input
          className={styles.input}
          placeholder="Add folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />

        {/* Dropdown de links con animación inline */}
        <div className={styles.dropdown}>
          <div
            className={styles.dropdownHeader}
            onClick={() => setShowLinks(!showLinks)}
          >
            <span>Bookmarks</span>
            {showLinks ? <BsChevronUp /> : <BsChevronDown />}
          </div>
          <div
            className={styles.linksList}
            style={{
              maxHeight: showLinks ? '200px' : '0',
              overflow: showLinks ? 'auto' : 'hidden',
              transition: 'max-height 0.3s ease-in-out',
            }}
          >
            {availableLinks.map((link) => (
              <label
                key={link.id}
                className={`${styles.linkItem} ${
                  selectedLinks.includes(link) ? styles.selected : ''
                }`}
              >
                <div className={styles.linkContent}>
                  <img src={link.icon} alt="icon" className={styles.linkIcon} />
                  <span>{link.name}</span>
                </div>
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
