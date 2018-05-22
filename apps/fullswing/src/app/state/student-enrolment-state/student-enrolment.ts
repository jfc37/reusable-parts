export interface StudentEnrolment {
  userId: string;
  enrolmentIds: string[];
}

export function studentEnrolmentToId(enrolment: StudentEnrolment): string {
  return [enrolment.userId, ...enrolment.enrolmentIds].join('|');
}
