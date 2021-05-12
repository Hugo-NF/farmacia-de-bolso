import React, { useState } from 'react';
import theme from 'constants/theme';

import {
  Button, Checkbox, Dialog, List, Menu, Portal, TextInput,
} from 'react-native-paper';

import DateTimePicker from '@react-native-community/datetimepicker';

import { pickBy, range } from 'lodash';

import TextInputMask from 'react-native-text-input-mask';

import {
  HourOfDay, MinuteOfHour, Schedule, WeekDays, WeekDaysAbbreviations,
} from 'typings/medication';
import { DayOption, styles } from './styles';

interface ICreateScheduleDialog {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  onSave: (arg0: Schedule) => void
}

const CreateScheduleDialog = ({
  visible,
  setVisible,
  onSave,
}: ICreateScheduleDialog): JSX.Element => {
  const [checked, setChecked] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [time, setTime] = useState<Date>();
  const [quantity, setQuantity] = useState<string>('');

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
                    setChecked({ ...checked, [day]: !checked[day] });
                  }}
                />
                <List.Item title={WeekDaysAbbreviations[day]} />
              </DayOption>
            ))}
          </List.Accordion>
          <Menu.Item
            onPress={() => setShowTimePicker(true)}
            icon="clock"
            title="Horário"
            style={styles.menuItem}
            titleStyle={styles.menuItemTitle}
          />
          {showTimePicker && (
          <DateTimePicker
            onChange={(_: unknown, selectedDate: Date | undefined) => {
              setShowTimePicker(false);
              setTime(selectedDate || time);
            }}
            value={time || new Date()}
            display="clock"
            mode="time"
          />
          )}
          <TextInput
            label="Quantidade"
            value={quantity}
            mode="flat"
            onChangeText={(text: string) => setQuantity(text)}
            render={(props: unknown) => (
              <TextInputMask
                {...props}
                mask="[000000000000]"
              />
            )}
            {...styles.textInput}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setVisible(false);
              setTime(new Date());
              setChecked({
                0: false,
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
              });
              setQuantity('');
            }}
            color={theme.colors.error}
          >
            Cancelar
          </Button>
          <Button
            onPress={() => {
              if (time !== undefined) {
                const selectedDays = pickBy(checked, (x) => x === true);
                const newSchedule: Schedule = {
                  days: Object.keys(selectedDays).map((x) => parseInt(x, 10) as WeekDays),
                  quantity: parseInt(quantity, 10),
                  time: {
                    hour: time.getHours() as HourOfDay,
                    minute: time.getMinutes() as MinuteOfHour,
                  },
                };
                onSave(newSchedule);

                setTime(new Date());
                setChecked({
                  0: false,
                  1: false,
                  2: false,
                  3: false,
                  4: false,
                  5: false,
                  6: false,
                });
                setQuantity('');
                setVisible(false);
              }
            }}
            color={theme.colors.success}
          >
            Salvar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
export default CreateScheduleDialog;
