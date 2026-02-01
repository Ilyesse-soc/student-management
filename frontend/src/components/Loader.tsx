
import styles from '../styles/Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner}></div>
      <span>Chargement…</span>
    </div>
  );
}
