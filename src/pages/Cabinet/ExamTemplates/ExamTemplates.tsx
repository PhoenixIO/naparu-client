import Button from 'react-bootstrap/Button';

import styles from './ExamTemplates.module.scss';

export function ExamTemplates() {
  return (
    <div className={styles.examTemplates}>
      <Button>Створити шаблон для тестування</Button>
    </div>
  );
}
