import styles from './Main.module.scss';

export function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.description}>Головна сторінка в розробці /ᐠ. ｡.ᐟ\ᵐᵉᵒʷˎˊ˗</div>
      <img src='/images/main.jpg' alt='Котик' />
    </div>
  );
}
