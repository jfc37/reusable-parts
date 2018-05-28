import { Action } from '@ngrx/store';
import { StudentEnrolment } from '../student-enrolment';

export enum StudentEnrolmentsActionTypes {
  Set = '[Student Enrolment] Set',

  Remove = '[Student Enrolment] Remove',
}

export class SetStudentEnrolments implements Action {
  readonly type = StudentEnrolmentsActionTypes.Set;

  constructor(public userId: string, public blockIds: string[]) {}
}

export class RemoveStudentEnrolment implements Action {
  readonly type = StudentEnrolmentsActionTypes.Remove;

  constructor(public userId: string) {}
}

export type StudentEnrolmentsActions = SetStudentEnrolments | RemoveStudentEnrolment;
