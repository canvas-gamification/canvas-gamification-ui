export interface Event {
  id: number;
  name: string;
  type: string;
  count_for_tokens: boolean;
  start_date: Date;
  end_date: Date;
  course: number;
}

export const EVENT_TYPES = {
    ASSIGNMENT: 'ASSIGNMENT',
    PRACTICE: 'PRACTICE',
    EXAM: 'EXAM',
};
