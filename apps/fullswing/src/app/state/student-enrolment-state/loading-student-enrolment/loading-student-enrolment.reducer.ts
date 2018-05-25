import { EntityState } from '@ngrx/entity';
import {
  LoadStatus,
  getLoadErrorStatus,
  getLoadedStatus,
  getLoadingStatus,
  loadAdapter,
  pageKeyToId,
} from '@reusable-parts/common-ngrx-patterns/src';
import {
  LoadingStudentEnrolmentsActions,
  LoadingStudentEnrolmentsActionTypes,
} from './loading-student-enrolment.actions';

export function loadingStudentEnrolmentsReducer(
  state = loadAdapter.getInitialState(),
  action: LoadingStudentEnrolmentsActions,
): EntityState<LoadStatus> {
  switch (action.type) {
    case LoadingStudentEnrolmentsActionTypes.Reset:
      return loadAdapter.getInitialState();

    case LoadingStudentEnrolmentsActionTypes.LoadRequest:
      return loadAdapter.addOne(getLoadingStatus(action.userId), state);

    case LoadingStudentEnrolmentsActionTypes.LoadSuccess:
      const removed = loadAdapter.removeOne(action.userId, state);
      return loadAdapter.addOne(getLoadedStatus(action.userId), removed);

    case LoadingStudentEnrolmentsActionTypes.LoadFailure:
      return loadAdapter.updateOne(
        {
          id: action.userId,
          changes: getLoadErrorStatus(action.userId, action.error),
        },
        state,
      );

    default:
      return state;
  }
}
