export enum CabinetPages {
  ExamTemplates = 'exam-template',
  Exams = 'exams',
  CreateTemplate = 'create-template',
}

export type PagesSliceState = {
  cabinetPage: CabinetPages;
}
