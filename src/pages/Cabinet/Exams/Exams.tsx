import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { setCabinetPage } from '../../../redux/pages/slice';
import { CabinetPages } from '../../../redux/pages/types';
import * as api from '../../../api';

import styles from './Exams.module.scss';

export function Exams() {
  const dispatch = useDispatch();
  const onExamCreate = () => {
    dispatch(setCabinetPage(CabinetPages.CreateExam));
  };
  const [exams, setExams] = useState<any>([]);

  useEffect(() => {
    api.get(`${api.endpoint}/exams`, (data: any) => {
      if (data.message) {
        toast(data.message, { type: 'error' });
      } else {
        setExams(data);
      }
    });
  }, []);

  const onExamView = (exam: any) => {
  }
  const onExamDelete = (exam: any, index: number) => {
  }

  return (
    <div className={styles.exams}>
      <Alert variant='dark'>
        Тут ви можете переглянути усі створені тестування. На основі цих шаблонів створюються тестування.
      </Alert>
      <Button className={styles.createExamButton} onClick={onExamCreate}>
        Створити тестування на основі шаблону
      </Button>

      <Table className={styles.examsTable} variant="dark" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Назва</th>
            <th>Пройшло учнів</th>
            <th>Дата створення</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {exams.map((exam: any, i: number) => {
            const onClick = () => onExamView(exam);
            const onDelete = () => onExamDelete(exam, i);
            return (
              <tr key={exam._id}>
                <td>{i + 1}</td>
                <td onClick={onClick} role="button">{exam.title}</td>
                <td>{exam.students.length}</td>
                <td>{new Date(exam.createdAt).toLocaleDateString()}</td>
                <td onClick={onDelete} role="button">
                  <FontAwesomeIcon icon={faTrash} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
