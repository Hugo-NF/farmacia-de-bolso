import React from 'react';
import { Text } from 'react-native';
import { Theme } from 'constants/index';
import { Schedule, WeekDays, WeekDaysAbbreviations } from 'typings/medication';
import { styledComponents } from './styles';

export interface IUseStatusTextProps {
  schedules: Schedule[]
}

const UseStatusText = ({ schedules }: IUseStatusTextProps): JSX.Element => {
  const { InUseText } = styledComponents;

  const weekdays = new Set();
  schedules.forEach((schedule) => schedule.days.forEach((day) => { weekdays.add(day); }));
  const weekdaysList = Array.from(weekdays).sort().map((day) => WeekDaysAbbreviations[day as WeekDays]);
  const text = weekdaysList.length !== 7 ? weekdaysList.join(', ') : 'Todos os dias';

  return (
    <>
      {weekdaysList.length
        ? (
          <InUseText>
            <Text style={{ color: Theme.colors.success }}>Em uso</Text> - {text}
          </InUseText>
        )
        : (
          <InUseText>
            Não está em uso
          </InUseText>
        )}
    </>
  );
};

export default UseStatusText;
