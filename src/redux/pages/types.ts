export enum CabinetPages {
  ExamTemplates = 'exam-template',
  Exams = 'exams',
}

export type PagesSliceState = {
  cabinetPage: CabinetPages;
}
