import React, { useState } from 'react';
import theme from 'constants/theme';

import {
  Button, Checkbox, Dialog, List, Portal,
} from 'react-native-paper';

import { range } from 'lodash';

import { Schedule, WeekDays, WeekDaysAbbreviations } from 'typings/medication';
import { DayOption } from './styles';

interface ICreateScheduleDialog {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

const CreateScheduleDialog = ({
  visible,
  setVisible,
}: ICreateScheduleDialog): JSX.Element => {
  const [schedule, setSchedule] = useState<Schedule>();
  const [checked, setChecked] = useState<Array<boolean>>([]);
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title>Agendar</Dialog.Title>
        <Dialog.Content>
          <List.Accordion
            title="Dias da semana"
            left={(props) => <List.Icon {...props} icon="calendar-week" />}
          >
            {range(7).map((day: WeekDays) => (
              <DayOption key={day}>
                <Checkbox
                  status={checked[day] ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked((prev) => {
                      prev[day] = !prev[day];
                      return prev;
                    });
                  }}
                />
                <List.Item title={WeekDaysAbbreviations[day]} />
              </DayOption>
            ))}
          </List.Accordion>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)} color={theme.colors.error}>Cancelar</Button>
          <Button onPress={() => setVisible(false)} color={theme.colors.success}>Salvar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
export default CreateScheduleDialog;
