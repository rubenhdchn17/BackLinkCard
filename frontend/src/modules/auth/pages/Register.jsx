import styles from "../styles/register.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className={styles.container}>
            {/* Sección izquierda */}
            <div className={styles.left}>
                <img src="/logo.svg" alt="Logo" className={styles.leftImage} />
            </div>

            {/* Sección derecha */}
            <div className={styles.right}>
                <div className={styles.contentContainer}>
                    <p className={styles.loginText}>
                        Already have an account? <a href="/" className={styles.loginLink}>Log in</a>
                    </p>

                    <div className={styles.textContainer}>
                        <h2>Sign Up</h2>
                        <p className={styles.description}>
                            Create an account to start organizing your bookmarks efficiently.
                        </p>
                    </div>

                    <div className={styles.formContainer}>
                        <div className={styles.inputGroup}>
                            <input type="text" placeholder="Username" className={styles.input} />
                            <input type="email" placeholder="Email" className={styles.input} />

                            <div className={styles.passwordWrapper}>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Password" 
                                    className={styles.input} 
                                />
                                <i 
                                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} 
                                    onClick={() => setShowPassword(!showPassword)}
                                />
                            </div>

                            <div className={styles.passwordWrapper}>
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder="Confirm Password" 
                                    className={styles.input} 
                                />
                                <i 
                                    className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`} 
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                />
                            </div>
                        </div>

                        <div className={styles.actionGroup}>
                            <button type="submit" className={styles.registerButton}>Sign Up</button>
                        </div>

                        <div className={styles.separator}>
                            <span>or continue with</span>
                        </div>

                        <div className={styles.socialButtons}>
                            <button className={styles.googleButton}>
                                <i className="bi bi-google"></i>
                            </button>
                            <button className={styles.facebookButton}>
                                <i className="bi bi-facebook"></i>
                            </button>
                        </div>

                        <p className={styles.termsText}>
                            By creating an account, you agree to BackLink's
                            <a href="#" className={styles.atc}> Terms of Service</a>. For more information on how we
                            protect your privacy, see our
                            <a href="#" className={styles.atc}> Privacy Policy</a>. Occasionally, we will send you
                            account-related emails.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
