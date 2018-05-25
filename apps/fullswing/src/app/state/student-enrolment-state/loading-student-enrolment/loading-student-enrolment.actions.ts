import { Action } from '@ngrx/store';
import { PageKey, SortDirection } from '@reusable-parts/common-ngrx-patterns/src';

export enum LoadingStudentEnrolmentsActionTypes {
  Reset = '[Loading Student Enrolments] Reset',

  Attempt = '[Loading Student Enrolments] Attempt Load',

  LoadRequest = '[Loading Student Enrolments] Load Request',
  LoadSuccess = '[Loading Student Enrolments] Load Success',
  LoadFailure = '[Loading Student Enrolments] Load Failure',
}

export class ResetLoadStudentEnrolments implements Action {
  readonly type = LoadingStudentEnrolmentsActionTypes.Reset;
}

export class AttemptLoadStudentEnrolments implements Action {
  readonly type = LoadingStudentEnrolmentsActionTypes.Attempt;

  constructor(public userId: string) {}
}

export class LoadStudentEnrolmentsRequest implements Action {
  readonly type = LoadingStudentEnrolmentsActionTypes.LoadRequest;
  constructor(public userId: string) {}
}

export class LoadStudentEnrolmentsSuccess implements Action {
  readonly type = LoadingStudentEnrolmentsActionTypes.LoadSuccess;
  constructor(public userId: string) {}
}

export class LoadStudentEnrolmentsFailure implements Action {
  readonly type = LoadingStudentEnrolmentsActionTypes.LoadFailure;
  constructor(public userId: string, public error: string) {}
}

export type LoadingStudentEnrolmentsActions =
  | ResetLoadStudentEnrolments
  | LoadStudentEnrolmentsRequest
  | LoadStudentEnrolmentsSuccess
  | LoadStudentEnrolmentsFailure;
