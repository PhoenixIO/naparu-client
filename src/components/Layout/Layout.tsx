import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../Header/Header';
import { clearAccount, setAccount } from '../../redux/account/slice'
import { selectEmail } from '../../redux/account/selector';
import * as api from '../../api';

import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const dispatch = useDispatch();
  const authorized = useSelector(selectEmail) !== '';
  
  useEffect(() => api.get(`${api.endpoint}/user/account`, (data) => {
    if (data.email) {
      dispatch(setAccount(data));
    } else {
      dispatch(clearAccount());
    }
  }), [])

  return (
    <div className={styles.layout}>
      <Header authorized={authorized} />
      <div className={styles.children}>
        {children}
      </div>
    </div>
  );
}
