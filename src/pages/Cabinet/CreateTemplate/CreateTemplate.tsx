import clsx from 'clsx';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faClose } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { selectEditingTemplate } from '../../../redux/templates/selector';
import { clearTemplates } from '../../../redux/templates/slice';
import * as api from '../../../api';

import styles from './CreateTemplate.module.scss';

export function CreateTemplate() {
  const dispatch = useDispatch();
  const editTemplate = useSelector(selectEditingTemplate);
  const [title, setTitle] = useState(editTemplate ? editTemplate.title : '');
  // Deep clone object, because Redux state is read-only.
  const [questions, setQuestions] = useState<any>
    (editTemplate ? JSON.parse(JSON.stringify(editTemplate.questions)) : []);

  const addQuestion = () => {
    setQuestions([...questions, {
      title: '',
      type: 'checkbox',
      answers: [
        {
          text: '',
          description: '',
          correct: false,
        }
      ],
    }]);
  }

  const saveTemplate = () => {
    const template = {
      title,
      questions,
    };

    const endpoint = api.endpoint + (editTemplate ? `/templates/edit/${editTemplate._id}` : '/templates/create');
    api.post(endpoint, template, (data) => {
      if (data.message) {
        toast(data.message, { type: 'error' });
      } else {
        toast('Шаблон успішно збережено!', { type: 'success' });
        dispatch(clearTemplates());
      }
    });
  }

  return (
    <div className={styles.template}>
      <div className={styles.inputGroup}>
        <input type="text" className={styles.input} placeholder="Назва шаблону"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className={styles.inputLabel}>Назва шаблону</label>
      </div>

      <Table className={styles.questionsTable} variant="dark" striped bordered>
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
      <Button className={styles.save} onClick={saveTemplate}>Зберегти шаблон</Button>
    </div>
  );
}

interface TemplateQuestionProps {
  question: any;
  index: number;
  updateQuestion: any;
}

function TemplateQuestion({ question, index, updateQuestion }: TemplateQuestionProps) {
  const [showEdit, setShowEdit] = useState(false);
  const openEdit = () => setShowEdit(true);
  const closeEdit = () => setShowEdit(false);

  const addAnswer = () => {
    question.answers = [...question.answers, {
      text: '',
      description: '',
      correct: false,
    }];
    updateQuestion(question);
  }

  if (showEdit) {
    return (
      <div className={styles.questionModal}>
        <div onClick={closeEdit} role="button">
          <FontAwesomeIcon icon={faClose} />
        </div>
        <div className={clsx(styles.inputGroup, styles.question)}>
          <input type="text" className={styles.input} placeholder="Запитання"
            value={question.title}
            onChange={(e) => {
              question.title = e.target.value;
              updateQuestion(question);
            }}
          />
          <label className={styles.inputLabel}>Запитання</label>
        </div>
        <select className="bg-dark">
          <option>Одна правильна відповідь</option>
          <option>Кілька правильних відповідей</option>
          <option disabled>Відповідності (в розробці)</option>
        </select>

        <Table className={styles.answersTable} variant="dark" striped bordered>
          <thead className='text-center'>
            <tr>
              <td>#</td>
              <td>Відповідь правильна?</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {question.answers.map((answer: any, i: number) => {
              const updateAnswer = (answer: any) => {
                if (!answer) {
                  question.answers.splice(i, 1);
                } else {
                  question.answers[i] = answer;
                }
                updateQuestion(question);
              }
              return <TemplateAnswer key={i} index={i} answer={answer} updateAnswer={updateAnswer} />;
            })}
          </tbody>
        </Table>
        <Button variant="dark" onClick={addAnswer}>Додати відповідь</Button>
        <Button onClick={closeEdit} className={styles.save}>Зберегти</Button>
      </div>
    );
  }
  return (
    <tr className={clsx(styles.question, 'align-middle text-center')} onClick={openEdit} role='button'>
      <td>{index + 1}</td>
      <td>{question.title}</td>
      <td role="button" onClick={() => updateQuestion(null)}>
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
}

interface TemplateAnswerProps {
  answer: any;
  index: number;
  updateAnswer: any;
}

function TemplateAnswer({ answer, index, updateAnswer }: TemplateAnswerProps) {
  return (
    <tr className={clsx(styles.answer, 'align-middle text-center')}>
      <td>{index + 1}</td>
      <td>
        <input type="checkbox" checked={answer.correct} onChange={(e) => {
          answer.correct = e.target.checked;
          updateAnswer(answer);
        }} />

        <div className={styles.inputGroup}>
          <input type="text" className={styles.input} placeholder="Відповідь"
            value={answer.text}
            onChange={(e) => {
              answer.text = e.target.value;
              updateAnswer(answer);
            }}
          />
          <label className={styles.inputLabel}>Відповідь</label>
        </div>

        <div className={styles.inputGroup}>
          <input type="text" className={styles.input} placeholder="Пояснення"
            value={answer.description}
            onChange={(e) => {
              answer.description = e.target.value;
              updateAnswer(answer);
            }}
          />
          <label className={styles.inputLabel}>Пояснення</label>
        </div>
      </td>

      <td role="button" onClick={() => updateAnswer(null)}>
        <FontAwesomeIcon icon={faTrash} />
      </td>
    </tr>
  );
}
