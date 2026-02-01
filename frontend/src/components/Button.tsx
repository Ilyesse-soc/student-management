
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from '../styles/Button.module.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  as?: 'a' | 'button';
} & ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({ variant = 'primary', children, as = 'button', ...props }: ButtonProps) {
  if (as === 'a') {
    return (
      <a className={styles[variant]} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button className={styles[variant]} {...props}>
      {children}
    </button>
  );
}
