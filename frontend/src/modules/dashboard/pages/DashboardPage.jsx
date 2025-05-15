import React, { useState } from "react";
import styles from "../styles/dashboard.module.css";
import SearchBar from "../components/search/SearchBar";
import DraggableBoard from "../components/board/DraggableBoard";
import ToolsButton from "../components/toolsbutton/ToolsButton";
import AddLinkPopup from "../components/toolsbutton/AddLinkPopup";
import AddFolderPopup from "../components/toolsbutton/AddFolderPopup";
import AddCardPopup from "../components/toolsbutton/AddCardPopup";
import UserSettingsPopup from "../components/toolsbutton/UserSettingsPopup";

/**
 * Página principal del Dashboard donde se muestra el tablero
 * con búsqueda, herramientas y varios popups para agregar links,
 * carpetas, tarjetas y configurar usuario.
 */
const DashboardPage = () => {
  // Estados para controlar visibilidad de los diferentes popups
  const [showAddLinkPopup, setShowAddLinkPopup] = useState(false);
  const [showAddFolderPopup, setShowAddFolderPopup] = useState(false);
  const [showAddCardPopup, setShowAddCardPopup] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);

  // Simulación de datos de usuario (podría venir de contexto o API)
  const user = { username: "johndoe", email: "john@example.com" };

  // Muestra el popup de configuración de usuario
  const handleUser = () => setShowUserSettings(true);

  // Cierra el popup de configuración de usuario
  const handleCloseUser = () => setShowUserSettings(false);

  // Actualiza los datos del usuario (aquí solo se imprime y cierra popup)
  const handleUserUpdate = (updatedData) => {
    console.log("Datos actualizados:", updatedData);
    setShowUserSettings(false);
  };

  // Abre los popups correspondientes al hacer clic en el menú de herramientas
  const handleAddLink = () => setShowAddLinkPopup(true);
  const handleAddFolder = () => setShowAddFolderPopup(true);
  const handleAddCard = () => setShowAddCardPopup(true);

  // Cierra cada popup correspondiente
  const handleCancelAddLink = () => setShowAddLinkPopup(false);
  const handleCancelAddFolder = () => setShowAddFolderPopup(false);
  const handleCancelAddCard = () => setShowAddCardPopup(false);

  // Funciones que reciben los datos nuevos agregados y cierran el popup
  const handleAddLinkConfirm = (newLink) => {
    console.log("Nuevo link:", newLink);
    setShowAddLinkPopup(false);
  };

  const handleAddFolderConfirm = (folderData) => {
    console.log("Nuevo folder:", folderData);
    setShowAddFolderPopup(false);
  };

  const handleAddCardConfirm = (cardData) => {
    console.log("Nueva card:", cardData);
    setShowAddCardPopup(false);
  };

  // Datos disponibles para mostrar en los popups de agregar (mock)
  const availableLinks = [
    { id: "1", name: "H&M", icon: "/icons/hm.png" },
    { id: "2", name: "Fila", icon: "/icons/fila.png" },
    { id: "3", name: "Kappa", icon: "/icons/kappa.png" },
    { id: "4", name: "ZZZZ", icon: "/icons/kappa.png" },
    { id: "5", name: "aaaa", icon: "/icons/kappa.png" },
    { id: "6", name: "ZaaaaZZZ", icon: "/icons/kappa.png" },
    { id: "7", name: "ZZZssssssZ", icon: "/icons/kappa.png" },
  ];

  const availableFolders = [
    { id: "a", name: "Ropa" },
    { id: "b", name: "Zapatos" },
    { id: "c", name: "Accesorios" },
    { id: "d", name: "test 4" },
    { id: "e", name: "test 5" },
    { id: "f", name: "test 6" },
  ];

  return (
    <div className={styles.container}>
      {/* Barra superior con el botón de herramientas y la barra de búsqueda */}
      <div className={styles.up}>
        <ToolsButton
          onAddLink={handleAddLink}
          onAddFolder={handleAddFolder}
          onAddCard={handleAddCard}
          onUser={handleUser}
        />
        <SearchBar />
      </div>

      {/* Componente principal del tablero con drag and drop */}
      <DraggableBoard />

      {/* Popups condicionales según estado */}
      {showAddLinkPopup && (
        <div className={styles.popupOverlay}>
          <AddLinkPopup
            onAdd={handleAddLinkConfirm}
            onClose={handleCancelAddLink}
          />
        </div>
      )}

      {showAddFolderPopup && (
        <AddFolderPopup
          onClose={handleCancelAddFolder}
          onAdd={handleAddFolderConfirm}
          availableLinks={availableLinks}
        />
      )}

      {showAddCardPopup && (
        <AddCardPopup
          onClose={handleCancelAddCard}
          onAdd={handleAddCardConfirm}
          availableFolders={availableFolders}
          availableLinks={availableLinks}
        />
      )}

      {showUserSettings && (
        <UserSettingsPopup
          user={user}
          onUpdate={handleUserUpdate}
          onClose={handleCloseUser}
        />
      )}
    </div>
  );
};

export default DashboardPage;
