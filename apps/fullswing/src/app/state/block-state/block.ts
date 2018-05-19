import { addMinutes, format } from 'date-fns';

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
  classIds?: string[];
}

export function getBlockEndTime(block: Block): string {
  const [hour, minute] = block.startTime.split(':').map(x => Number(x));
  const startTimeAsDate = new Date(null, null, null, hour, minute);
  const endTimeAsDate = addMinutes(startTimeAsDate, block.classLength);
  const endTime = format(endTimeAsDate, 'HH:mm');

  return endTime;
}
