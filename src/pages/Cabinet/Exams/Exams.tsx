import Button from 'react-bootstrap/Button';

import styles from './Exams.module.scss';

export function Exams() {
  return (
    <div className={styles.exams}>
      <Button>Створити тестування на основі шаблону</Button>
    </div>
  );
}
