import styles from "../styles/forgotPassword.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Password reset link sent to:", email);
    };

    return (
        <div className={styles.container}>
            {/* Sección izquierda */}
            <div className={styles.left}>
                <img src="/logo.svg" alt="Logo" className={styles.leftImage} />
            </div>

            {/* Sección derecha */}
            <div className={styles.right}>
                <div className={styles.contentContainer}>
                    <p className={styles.backText}>
                        <a href="/" className={styles.backLink}>
                            <i className="bi bi-arrow-left"></i> Back to Login
                        </a>
                    </p>

                    <div className={styles.textContainer}>
                        <h2>Forgot Password?</h2>
                        <p className={styles.description}>
                            Enter your email address and we will send you a link to reset your password.
                        </p>
                    </div>

                    <form className={styles.formContainer} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                className={styles.input} 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.actionGroup}>
                            <button type="submit" className={styles.resetButton}>Send Reset Link</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
