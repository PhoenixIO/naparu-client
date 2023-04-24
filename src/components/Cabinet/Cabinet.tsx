import { useDispatch, useSelector } from 'react-redux';
import styles from './Cabinet.module.scss';

export function Cabinet() {
  const dispatch = useDispatch();

  return (
    <div className={styles.cabinet}>
      <div className={styles.menu}>
        <ul>
          <li>Список шаблонів</li>
          <li>Список тестів</li>
        </ul>
      </div>

      <div className={styles.content}>

      </div>
    </div>
  )
}