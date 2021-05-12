// File to hold utils related to medication schedule.

// Package imports.
import Lodash from 'lodash';

// Util imports.
import {
  measurementUnitPluralForm,
  measurementUnitSingularForm,
} from './measurementUnits';

// Type imports.
import {
  MedicationSchedule,
  Schedule,
  WeekDays,
  WeekDaysAbbreviations,
} from '../typings/medication';

// Functions.
export function medicationScheduleDaysToText(
  medicationSchedule : MedicationSchedule,
) : string {
  const scheduleDays = medicationSchedule.schedule.days;
  const allWeekDays = [
    WeekDays.Sunday,
    WeekDays.Monday,
    WeekDays.Tuesday,
    WeekDays.Wednesday,
    WeekDays.Thursday,
    WeekDays.Friday,
    WeekDays.Saturday,
  ];

  if (Lodash.difference(allWeekDays, scheduleDays).length === 0) {
    return 'Todos os dias';
  }

  return scheduleDays
    .sort()
    .map((scheduleDay) => WeekDaysAbbreviations[scheduleDay])
    .join(', ');
}

export function medicationScheduleDosage(
  medicationSchedule : MedicationSchedule,
) : string {
  const medicationQuantity = medicationSchedule.schedule.quantity;

  if (medicationQuantity === 1) {
    return `${medicationQuantity} ${
      measurementUnitSingularForm(medicationSchedule.medicationData.unit)
    }`;
  }

  return `${medicationQuantity} ${
    measurementUnitPluralForm(medicationSchedule.medicationData.unit)
  }`;
}

export function medicationScheduleTime(
  medicationSchedule : MedicationSchedule,
) : string {
  const hourPaddedWithZeros = Lodash.padStart(
    medicationSchedule.schedule.time.hour.toString(), 2, '0',
  );
  const minutePaddedWithZeros = Lodash.padStart(
    medicationSchedule.schedule.time.minute.toString(), 2, '0',
  );

  return `${hourPaddedWithZeros}:${minutePaddedWithZeros}`;
}

export function sortSchedules(
  schedule1 : Schedule,
  schedule2 : Schedule,
) : number {
  if (schedule1.time.hour !== schedule2.time.hour) {
    return schedule1.time.hour - schedule2.time.hour;
  }

  return schedule1.time.minute - schedule2.time.minute;
}
