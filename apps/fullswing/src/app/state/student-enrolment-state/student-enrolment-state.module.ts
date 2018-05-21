import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, INITIAL_STATE } from '@ngrx/store';
import { studentEnrolmentFeatureReducer, getInitialStudentEnrolmentFeatureState } from './student-enrolment.reducer';
import { studentEnrolmentFeatureEffects } from './student-enrolment.effects';
import { EffectsModule } from '@ngrx/effects';
import { StudentEnrolmentRepository } from './student-enrolment.repository';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('studentEnrolmentFeature', studentEnrolmentFeatureReducer),
    EffectsModule.forFeature(studentEnrolmentFeatureEffects),
  ],
  providers: [
    ...studentEnrolmentFeatureEffects,
    StudentEnrolmentRepository,
    { provide: INITIAL_STATE, useFactory: getInitialStudentEnrolmentFeatureState },
  ],
})
export class StudentEnrolmentStateModule {}
