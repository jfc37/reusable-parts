import { Action } from '@ngrx/store';
import { StudentEnrolment } from '../student-enrolment';

export enum UpdatingStudentEnrolmentsActionTypes {
  Reset = '[Updating Student Enrolments] Reset',

  Attempt = '[Updating Student Enrolments] Attempt Update',

  UpdateRequest = '[Updating Student Enrolments] Update Request',
  UpdateSuccess = '[Updating Student Enrolments] Update Success',
  UpdateFailure = '[Updating Student Enrolments] Update Failure',
}

export class ResetUpdateStudentEnrolments implements Action {
  readonly type = UpdatingStudentEnrolmentsActionTypes.Reset;
}

export class AttemptUpdateStudentEnrolments implements Action {
  readonly type = UpdatingStudentEnrolmentsActionTypes.Attempt;

  constructor(public enrolment: StudentEnrolment) {}
}

export class UpdateStudentEnrolmentsRequest implements Action {
  readonly type = UpdatingStudentEnrolmentsActionTypes.UpdateRequest;
  constructor(public enrolment: StudentEnrolment) {}
}

export class UpdateStudentEnrolmentsSuccess implements Action {
  readonly type = UpdatingStudentEnrolmentsActionTypes.UpdateSuccess;
  constructor(public enrolment: StudentEnrolment) {}
}

export class UpdateStudentEnrolmentsFailure implements Action {
  readonly type = UpdatingStudentEnrolmentsActionTypes.UpdateFailure;
  constructor(public enrolment: StudentEnrolment, public error: string) {}
}

export type UpdatingStudentEnrolmentsActions =
  | ResetUpdateStudentEnrolments
  | UpdateStudentEnrolmentsRequest
  | UpdateStudentEnrolmentsSuccess
  | UpdateStudentEnrolmentsFailure;