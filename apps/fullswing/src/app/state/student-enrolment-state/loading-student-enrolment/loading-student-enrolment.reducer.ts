import { EntityState } from '@ngrx/entity';
import {
  LoadStatus,
  getLoadErrorStatus,
  getLoadedStatus,
  getLoadingStatus,
  loadAdapter,
  pageKeyToId,
} from '@reusable-parts/common-ngrx-patterns';
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
      return loadAdapter.addOne(getLoadingStatus('current'), state);

    case LoadingStudentEnrolmentsActionTypes.LoadSuccess:
      const removed = loadAdapter.removeOne('current', state);
      return loadAdapter.addOne(getLoadedStatus('current'), removed);

    case LoadingStudentEnrolmentsActionTypes.LoadFailure:
      return loadAdapter.updateOne(
        {
          id: 'current',
          changes: getLoadErrorStatus('current', action.error),
        },
        state,
      );

    default:
      return state;
  }
}
