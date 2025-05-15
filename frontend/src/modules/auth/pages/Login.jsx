import { useState } from "react";
import styles from "../styles/login.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.container}>
            {/* Sección izquierda */}
            <div className={styles.left}>
                <div className={styles.contentContainer}>
                    {/* Contenedor del título y descripción */}
                    <div className={styles.textContainer}>
                        <h2>Welcome!</h2>
                        <p className={styles.description}>
                            Take control of your web bookmarks with a flexible organization system.
                            Sort them by folders, names, or custom categories to easily access your
                            favorite links when you need them.
                        </p>
                    </div>

                    {/* Contenedor del formulario */}
                    <div className={styles.formContainer}>
                        {/* Agrupación de inputs */}
                        <div className={styles.inputGroup}>
                            <input type="text" placeholder="Correo electrónico o usuario" className={styles.input} />
                            <div className={styles.passwordContainer}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Contraseña"
                                    className={styles.input}
                                />
                                <button type="button" className={styles.togglePassword} onClick={togglePasswordVisibility}>
                                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                </button>
                            </div>
                        </div>

                        {/* Grupo con forgot password y botón */}
                        <div className={styles.actionGroup}>
                            <a href="/ForgotPassword" className={styles.forgotPassword}>Forgot password?</a>
                            <button type="submit" className={styles.loginButton}>Iniciar Sesión</button>
                        </div>
                    </div>

                    {/* Contenedor agrupado */}
                    <div className={styles.authContainer}>
                        {/* Separador */}
                        <div className={styles.separator}>
                            <span className={styles.line}></span>
                            <span className={styles.orText}>or continue with</span>
                            <span className={styles.line}></span>
                        </div>

                        {/* Botones sociales */}
                        <div className={styles.socialContainer}>
                            <button className={styles.googleButton}>
                                <i className="bi bi-google"></i>
                            </button>
                            <button className={styles.facebookButton}>
                                <i className="bi bi-facebook"></i>
                            </button>
                        </div>

                        {/* Enlace de registro */}
                        <p className={styles.registerText}>
                            ¿No tienes cuenta? <a href="/register" className={styles.registerLink}>Regístrate</a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Sección derecha */}
            <div className={styles.right}>
                <img src="/logo.svg" alt="Logo" className={styles.rightImage} />
            </div>
        </div>
    );
};

export default Login;
