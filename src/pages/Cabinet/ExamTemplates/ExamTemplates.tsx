import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import { setCabinetPage } from '../../../redux/pages/slice';
import { CabinetPages } from '../../../redux/pages/types';

import styles from './ExamTemplates.module.scss';

export function ExamTemplates() {
  const dispatch = useDispatch();
  const templates = [
    {
      _id: 'asdasdadsa',
      title: 'Системи вимірювання одиниць',
      time: 30,
      createdAt: new Date(),
      questions: [
        {
          type: 'checkbox',
          question: 'чи є відповідь?',
          answers: [
            {
              text: 'так',
              correct: true,
            },
            {
              text: 'ні',
              correct: false,
            }
          ],
        },
      ],
    },
  ];

  const onEditTemplate = (template: any) => {
    console.log('edit template');
  }
  const onTemplateCreate = () => {
    dispatch(setCabinetPage(CabinetPages.CreateTemplate))
  }

  return (
    <div className={styles.examTemplates}>
      <Alert variant='dark'>
        Тут ви можете переглянути усі створені шаблони. На основі цих шаблонів створюються тестування.
      </Alert>
      <Button className={styles.createTemplateButton} onClick={onTemplateCreate}>
        Створити шаблон для тестування
      </Button>
      {templates.length === 0 && <Alert variant="dark">Немає створених шаблонів</Alert>}
      <Table className={styles.templatesTable} variant="dark" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Назва</th>
            <th>Кількість запитань</th>
            <th>Дата створення</th>
          </tr>
        </thead>

        <tbody>
          {templates.map((template, i) => {
            const onClick = () => onEditTemplate(template);
            return <TemplateHeading key={template._id} index={i} template={template} onClick={onClick} />
          })}
        </tbody>
      </Table>
    </div>
  );
}

interface TemplateHeadingProps {
  template: any;
  index: number;
  onClick: any;
}
function TemplateHeading({ template, index, onClick }: TemplateHeadingProps) {
  return (
    <tr role="button" onClick={onClick}>
      <td>{index + 1}</td>
      <td>{template.title}</td>
      <td>{template.questions.length}</td>
      <td>{new Date(template.createdAt).toLocaleDateString()}</td>
    </tr>
  );
}