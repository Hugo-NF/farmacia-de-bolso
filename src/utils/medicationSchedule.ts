// File to hold utils related to medication schedule.

// Package imports.
import Lodash from 'lodash';

// Type imports.
import {
  MedicationSchedule,
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

  if (Lodash.difference(scheduleDays, allWeekDays).length === 0) {
    return 'Todos os dias';
  }

  return scheduleDays
    .map((scheduleDay) => WeekDaysAbbreviations[scheduleDay])
    .join(', ');
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
