import clsx from 'clsx';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

import styles from './CreateTemplate.module.scss';

export function CreateTemplate() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<any>([]);

  const addQuestion = () => {
    setQuestions([...questions, {
      title: '',
      type: 'checkbox',
      answers: [
        'Відповідь 1',
        'Відповідь 2',
      ],
    }]);
  }

  return (
    <div className={styles.template}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.input}
          placeholder="Назва шаблону"
          name="name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="name" className={styles.inputLabel}>Назва шаблону</label>
      </div>

      <Table className={styles.questionsTable} variant="dark" striped bordered hover>
        <tbody>
          {questions.map((question: any, i: number) => {
            const updateQuestion = (question: any) => {
              if (!question) {
                questions.splice(i, 1);
              } else {
                questions[i] = question;
              }
              setQuestions([...questions]);
            }
            return <TemplateQuestion key={i} question={question} index={i} updateQuestion={updateQuestion} />;
          })}
        </tbody>
      </Table>
      <Button variant="light" onClick={addQuestion}>Додати запитання</Button>
    </div>
  );
}

interface TemplateQuestionProps {
  question: any;
  index: number;
  updateQuestion: any;
}

function TemplateQuestion({ question, index, updateQuestion }: TemplateQuestionProps) {
  return (
    <tr className={clsx(styles.question, 'align-middle text-center')}>
      <td>{index + 1}</td>
      <td>
        <div className={clsx(styles.inputGroup, styles.question)}>
          <input
            type="text"
            className={styles.input}
            placeholder="Запитання"
            name="name"
            value={question.title}
            onChange={(e) => {
              question.title = e.target.value;
              updateQuestion(question);
            }}
            required
          />
          <label htmlFor="name" className={styles.inputLabel}>Запитання</label>
        </div>
        <select className="bg-dark">
          <option>Одна правильна відповідь</option>
          <option>Кілька правильних відповідей</option>
          <option disabled>Відповідності (в розробці)</option>
        </select>
      </td>
      <td role="button" onClick={() => updateQuestion(null)}>
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
}
