import { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NotificationManager } from 'react-notifications';
import * as api from '../../api';

import styles from './Register.module.scss';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const onRegister = (e: any) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      NotificationManager.error('Паролі не співпадають :(', '', 3000);
      return;
    }

    api.post(`${api.endpoint}/auth/register`, { email, password }, (data: any) => {
      if (data.message) {
        NotificationManager.error(data.message, '', 3000);
      } else {
        NotificationManager.success('Ви успішно зареєструвались!', 'Тепер увійдіть до акаунту', 3000);
      }
    });
  };

  return (
    <div className={styles.register}>
      <div className={styles.title}>Реєстрація</div>
      <Form className={styles.form}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ваш E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введіть E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Придумайте надійний пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введіть пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control
            type="password"
            placeholder="Повторіть пароль"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Button variant="primary" type="submit" className={styles.submit} onClick={onRegister}>
            Зареєструватись
          </Button>
          <Link to="/login">
            Вже зареєстровані? Ввійти
          </Link>
        </Form.Group>
      </Form>
    </div>
  );
}
