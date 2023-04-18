import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from './Login.module.scss';

export function Login() {
  const onLogin = () => {
    console.log('login req');
  };

  return (
    <div className={styles.login}>
      <div className={styles.title}>Вхід</div>
      <Form className={styles.form}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ваш E-mail</Form.Label>
          <Form.Control type="email" placeholder="Введіть E-mail" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="Введіть пароль" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Не виходити" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Button variant="primary" type="submit" className={styles.submit}>
            Ввійти
          </Button>
          <Link to="/register">
            Немає аккаунту? Зареєструватись
          </Link>
        </Form.Group>
      </Form>
    </div>
  );
}
