import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as api from '../../api';
import { setAccount } from '../../redux/account/slice'

import styles from './Login.module.scss';

export function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e: any) => {
    e.preventDefault();

    api.post(`${api.endpoint}/auth/login`, { email, password }, (data: any) => {
      const { user } = data;
      if (user) {
        NotificationManager.success('Ви ввійшли до акаунту!', '', 3000);
        dispatch(setAccount(user));
        navigate('/cabinet');
      } else {
        NotificationManager.error(data.message, '', 3000);
      }
    });
  };

  return (
    <div className={styles.login}>
      <div className={styles.title}>Вхід</div>
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
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введіть пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Не виходити" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Button variant="primary" type="submit" className={styles.submit} onClick={onLogin}>
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
