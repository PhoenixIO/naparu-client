import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { Loader } from "../../components/Loaders/Loader";
import * as api from '../../api';

import styles from './Exam.module.scss';
import inputStyles from '../../components/Inputs/InputText.module.scss';
import { Line } from '../../components/Line';
import { Button } from 'react-bootstrap';

export function Exam() {
  const { id } = useParams();
  const [exam, setExam] = useState<any>(null);
  const [template, setTemplate] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  const [username, setUsername] = useState('');

  useEffect(() => {
    api.get(`${api.endpoint}/exams/${id}`, (data) => {
      if (!data.message) {
        setExam(data.exam);
        setTemplate(data.template);
      } else {
        toast(data.message, { type: 'error' });
      }
      setLoading(false);
    });
  }, []);

  const startExam = () => {
    if (!username) {
      toast(`Введіть своє прізвище та ім'я, а ми в кінці покажем подаруночок 😉`, { type: 'default' });
    } else {
      toast(`Наші нано-хом'ячки працюють не покладаючи рук, щоб продовжити розвивати проект! Очікуйте оновлень 😊`);
    }
  };

  return (
    <div className={styles.exam}>
      {exam === null ? (
        <Loader className={!isLoading ? styles.loader : ''} />
      ) : (
        <div className={styles.info}>
          <div className={styles.title}>{template.title}</div>
          <div className={styles.description}>Кількість запитань: {template.questions.length}</div>
          <div className={styles.description}>Дата створення: {(new Date(exam.createdAt)).toLocaleDateString()}</div>
          <Line />
          <div className={inputStyles.inputGroup}>
            <input type="text" className={inputStyles.input} placeholder="Ваше прізвище та ім'я"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className={inputStyles.inputLabel}>Ваше прізвище та ім'я</label>
          </div>
          <Button className={styles.startButton} onClick={startExam}>Почати тестування</Button>
        </div>
      )}
    </div>
  );
}
