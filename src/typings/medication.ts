// Exported types.
export type Medication = {
  alarms: Array<MedicationSchedule>,
  data: MedicationData,
  history: Array<MedicationHistoryEntry>,
  schedule: Array<MedicationSchedule>,
  stock: number,
};

export type MedicationData = {
  name: string,
  unit: string,
};

export type MedicationHistoryEntry = {
  id: number,
  datetime: string,
  medicated: boolean,
  quantity: number,
};

export type MedicationSchedule = {
  id: number,
  days: string,
  quantity: number,
  time: string,
};
