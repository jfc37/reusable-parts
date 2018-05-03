export interface Block {
  id?: string;
  name: string;
  startDate: string;
  startTime: string;
  classLength: number;
  numberOfClasses: number;
  classCapacity: number;
  teacherIds: string[];
  inviteOnly: boolean;
}
