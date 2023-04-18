import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <div>
        <Link to="/" className={styles.title}>NaParu</Link>
      </div>
      <div>
        <Link to="/login">
          <Button variant="light" className={styles.loginButton}>Вхід</Button>
        </Link>
      </div>
    </ header>
  );
}
