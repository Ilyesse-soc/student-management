import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css';

export default function Header() {
  const router = useRouter();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.project}>Gestion des étudiants</span>
        </div>
        <nav className={styles.nav}>
          <Link href="/" legacyBehavior>
            <a className={router.pathname === '/' ? styles.active : ''}>Accueil</a>
          </Link>
          <Link href="/students" legacyBehavior>
            <a className={router.pathname === '/students' ? styles.active : ''}>Étudiants</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
