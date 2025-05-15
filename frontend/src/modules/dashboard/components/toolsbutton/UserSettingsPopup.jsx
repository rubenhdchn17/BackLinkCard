import React, { useState } from 'react';
import styles from './UserSettingsPopup.module.css';

/**
 * Componente para mostrar y editar el perfil de usuario.
 * 
 * Props:
 * - user: objeto con datos del usuario { username, email, ... }
 * - onUpdate: función que recibe los datos actualizados al guardar
 * - onClose: función para cerrar el popup
 */
const UserSettingsPopup = ({ user, onUpdate, onClose }) => {
  // Estado local para manejar el formulario, inicializado con datos del usuario
  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Controla si el formulario está en modo edición
  const [editing, setEditing] = useState(false);
  // Guarda errores de validación para mostrar al usuario
  const [errors, setErrors] = useState({});

  /**
   * Valida que la contraseña cumpla con requisitos:
   * - mínimo 8 caracteres
   * - al menos una mayúscula
   * - al menos una minúscula
   * - al menos un número
   */
  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUpper = /[A-Z]/;
    const hasLower = /[a-z]/;
    const hasNumber = /[0-9]/;
    return (
      minLength.test(password) &&
      hasUpper.test(password) &&
      hasLower.test(password) &&
      hasNumber.test(password)
    );
  };

  // Actualiza el estado del formulario al cambiar un input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario con validación
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // La contraseña actual es obligatoria para actualizar
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Debes ingresar tu contraseña actual.';
    }

    // Si se intenta cambiar contraseña, validar requisitos y confirmación
    if (formData.newPassword || formData.confirmPassword) {
      if (!validatePassword(formData.newPassword)) {
        newErrors.newPassword = 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.';
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden.';
      }
    }

    // Si hay errores, actualizar estado para mostrarlos y no continuar
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si todo está bien, llamar a onUpdate con los datos del formulario
    onUpdate(formData);
    // Salir del modo edición
    setEditing(false);
    // Cerrar popup
    onClose();
  };

  return (
    <div className={styles["user-popup-overlay"]}>
      <div className={styles["user-popup"]}>
        {/* Botón para cerrar el popup */}
        <button className={styles["user-popup-close"]} onClick={onClose}>×</button>
        <h2>Perfil de Usuario</h2>

        <form onSubmit={handleSubmit} className={styles["user-form"]}>
          {/* Campo para nombre de usuario, solo editable en modo edición */}
          <label>
            Usuario:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>

          {/* Campo para correo electrónico, solo editable en modo edición */}
          <label>
            Correo:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editing}
            />
          </label>

          {/* Campos de contraseña solo visibles en modo edición */}
          {editing && (
            <>
              <label>
                Contraseña actual:
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                />
                {/* Mensaje de error para contraseña actual */}
                {errors.currentPassword && <span className={styles["error"]}>{errors.currentPassword}</span>}
              </label>

              <label>
                Nueva contraseña:
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
                {/* Mensaje de error para nueva contraseña */}
                {errors.newPassword && <span className={styles["error"]}>{errors.newPassword}</span>}
              </label>

              <label>
                Confirmar nueva contraseña:
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {/* Mensaje de error para confirmación de contraseña */}
                {errors.confirmPassword && <span className={styles["error"]}>{errors.confirmPassword}</span>}
              </label>
            </>
          )}

          {/* Botones para cancelar o guardar según estado de edición */}
          <div className={styles["user-popup-buttons"]}>
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setErrors({});
                  }}
                >
                  Cancelar
                </button>
                <button type="submit">Guardar Cambios</button>
              </>
            ) : (
              <button type="button" onClick={() => setEditing(true)}>Editar Perfil</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSettingsPopup;
