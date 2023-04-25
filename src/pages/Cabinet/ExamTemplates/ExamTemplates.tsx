import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import { setCabinetPage } from '../../../redux/pages/slice';
import { CabinetPages } from '../../../redux/pages/types';
import { setEditingTemplate } from '../../../redux/templates/slice';
import * as api from '../../../api';

import styles from './ExamTemplates.module.scss';

export function ExamTemplates() {
  const dispatch = useDispatch();
  const [templates, setTemplates] = useState<any>([]);

  useEffect(() => {
    api.get(`${api.endpoint}/templates`, (data: any) => {
      if (data.message) {
        toast(data.message, { type: 'error' });
      } else {
        setTemplates(data);
      }
    });
  }, []);

  const onEditTemplate = (template: any) => {
    dispatch(setEditingTemplate(template));
    dispatch(setCabinetPage(CabinetPages.CreateTemplate));
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
          {templates.map((template: any, i: number) => {
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
