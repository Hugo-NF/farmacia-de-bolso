// Exported enums.
export enum WeekDays {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

// Exported types.
export type Medication = {
  id: string,
  alarms: Array<Schedule>,
  data: MedicationData,
  schedule: Array<Schedule>,
  stock: number,
};

export type MedicationAlarm = {
  id: string,
  medicationName: string,
  schedule: Schedule,
};

export type MedicationData = {
  name: string,
  unit: string,
};

export type MedicationHistory = {
  medicationUID: string,
  history: Array<MedicationHistoryEntry>,
};

export type MedicationHistoryEntry = {
  datetime: Date,
  medicated: boolean,
  quantity: number,
};

export type Schedule = {
  days: Array<WeekDays>,
  quantity: number,
  time: TimeOfDay,
};

export type TimeOfDay = {
  hour: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
    16 | 17 | 18 | 19 | 20 | 21 | 22 | 23,
  minute: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
    16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 |
    31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 |
    46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59,
};
