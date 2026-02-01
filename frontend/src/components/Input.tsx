import { InputHTMLAttributes } from 'react';
import styles from '../styles/Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <input className={styles.input} {...props} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
