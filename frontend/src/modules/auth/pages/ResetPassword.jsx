import styles from "../styles/resetPassword.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("New password set:", password);
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
                        <h2>Reset Password</h2>
                        <p className={styles.description}>
                            Enter your new password below.
                        </p>
                    </div>

                    <form className={styles.formContainer} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <input 
                                type="password" 
                                placeholder="New Password" 
                                className={styles.input} 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input 
                                type="password" 
                                placeholder="Confirm Password" 
                                className={styles.input} 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.actionGroup}>
                            <button type="submit" className={styles.resetButton}>Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
