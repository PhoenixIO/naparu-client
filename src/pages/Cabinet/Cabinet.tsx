import { useDispatch, useSelector } from 'react-redux';
import { selectCabinetPage } from '../../redux/pages/selector';
import { setCabinetPage } from '../../redux/pages/slice';
import { CabinetPages } from '../../redux/pages/types';
import { ExamTemplates } from './ExamTemplates/ExamTemplates';
import { Exams } from './Exams/Exams';

import styles from './Cabinet.module.scss';
import { logout } from '../../redux/account/slice';

export function Cabinet() {
  const dispatch = useDispatch();
  const page = useSelector(selectCabinetPage);

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <div className={styles.cabinet}>
      <div className={styles.menu}>
        <ul>
          <li onClick={() => dispatch(setCabinetPage(CabinetPages.ExamTemplates))}>Список шаблонів</li>
          <li onClick={() => dispatch(setCabinetPage(CabinetPages.Exams))}>Список тестувань</li>
          <li className={styles.logout} onClick={onLogout}>Вийти з акаунту</li>
        </ul>
      </div>

      <div className={styles.content}>
        {page === CabinetPages.ExamTemplates && <ExamTemplates />}
        {page === CabinetPages.Exams && <Exams />}
      </div>
    </div>
  )
}
