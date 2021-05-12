/* eslint-disable no-console */
/* eslint-disable camelcase */
import {
  Platform,
  NativeEventEmitter,
  NativeModules,
  EmitterSubscription,
} from 'react-native';
import ReactNativeAN from 'react-native-alarm-notification';
import MedicationApi from 'services/medication/api';
import { medicationAlarmDates } from 'utils/medicationSchedule';

const { RNAlarmNotification } = NativeModules;
const RNEmitter = new NativeEventEmitter(RNAlarmNotification);

interface AlarmNotificationData {
  title: string,
  message: string,
  vibrate: boolean,
  play_sound: boolean,
  data: unknown,
  loop_sound: boolean,
  has_button: boolean,
  fire_date: Date,
  schedule_type: 'once' | 'repeat',
  repeat_interval?: 'minutely' | 'hourly' | 'daily' | 'weekly',
  interval_value?: number,
}

interface AlarmEntry extends AlarmNotificationData {
  id: string;
}

class AlarmManager {
  private subscribeDismiss: EmitterSubscription | null = null;

  private subscribeOpen: EmitterSubscription | null = null;

  private update: AlarmEntry[] = [];

  private static alarmManager: AlarmManager|null = null;

  public static getInstance = (): AlarmManager => {
    if (!AlarmManager.alarmManager) { AlarmManager.alarmManager = new AlarmManager(); }
    return AlarmManager.alarmManager;
  }

  private constructor() {
    this.subscribeDismiss = RNEmitter.addListener(
      'OnNotificationDismissed',
      (data) => {
        const obj = JSON.parse(data);
        console.log(`notification id: ${obj.id} dismissed`);
        this.stopAlarmSound();
      },
    );

    this.subscribeOpen = RNEmitter.addListener(
      'OnNotificationOpened',
      (data) => {
        console.log(data);
        const obj = JSON.parse(data);
        console.log(`app opened by notification: ${obj.id}`);
        this.stopAlarmSound();
      },
    );

    // check ios permissions
    if (Platform.OS === 'ios') {
      this.showPermissions();
    }
  }

  setAlarm = async (notificationData: AlarmNotificationData):Promise<void> => {
    try {
      const alarm = await ReactNativeAN.scheduleAlarm(notificationData);
      console.log(alarm);
      if (alarm) {
        this.update.push({ ...notificationData, id: alarm.id });
      }
    } catch (e) {
      console.log(e);
      console.dir(e);
    }
  };

  stopAlarmSound = ():void => {
    ReactNativeAN.stopAlarmSound();
  };

  showPermissions = ():void => {
    ReactNativeAN.checkPermissions((permissions: unknown) => {
      console.log(permissions);
      if (!permissions) {
        ReactNativeAN.requestPermissions({
          alert: true,
          badge: true,
          sound: true,
        }).then(
          (data: unknown) => {
            console.log('RnAlarmNotification.requestPermissions', data);
          },
          (data: unknown) => {
            console.log('RnAlarmNotification.requestPermissions failed', data);
          },
        );
      }
    });
  };

  getAlarms = async ():Promise<void> => {
    const list = await ReactNativeAN.getScheduledAlarms();

    console.log(list);
    const updated = list.map((l) => ({
      date: `alarm: ${l.day}-${l.month}-${l.year} ${l.hour}:${l.minute}:${l.second}`,
      id: l.id,
    }));

    this.update = updated;
  };

  deleteAlarm = async (alarm: AlarmEntry): Promise<void> => {
    console.log(`delete alarm: ${alarm.id}`);

    const id = parseInt(alarm.id, 10);
    if (alarm.schedule_type === 'once') {
      ReactNativeAN.deleteAlarm(id);
    } else {
      ReactNativeAN.deleteRepeatingAlarm(id);
    }
  };

  deleteAlarms = async (): Promise<void> => {
    await this.getAlarms();
    await Promise.all(this.update.map(async (alarm) => {
      await this.deleteAlarm(alarm);
    }));
  };

  public async fetchAllAlarms(): Promise<boolean> {
    try {
      const medications = await MedicationApi.getCurrentUserMedications();
      this.deleteAlarms();
      medications.forEach((medication) => {
        medication.alarms.forEach((alarm) => {
          medicationAlarmDates(alarm).forEach((date: Date) => {
            this.setAlarm({
              title: `Tomar ${medication.data.name}`,
              message: 'Tome seu remédio',
              vibrate: true,
              play_sound: true,
              schedule_type: 'repeat',
              interval_value: 1,
              repeat_interval: 'weekly',
              fire_date: date,
              data: { content: medication },
              loop_sound: true,
              has_button: true,
            });
          });
        });
      });
    } catch {
      return false;
    }
    return true;
  }
}

export default AlarmManager;
