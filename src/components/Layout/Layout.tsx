import { ReactNode } from 'react';
import { Header } from '../Header/Header';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
    </div>
  );
}
