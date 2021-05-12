// Package imports.
import firestore from '@react-native-firebase/firestore';
import { v4 as uuid } from 'uuid';

// Service imports.
import userAPI from '../user/api';

// Utils imports.
import { sortSchedules } from '../../utils/medicationSchedule';

// Type imports.
import {
  FirebaseCollection,
  FirebaseDocumentRef,
} from '../../typings/firebase';
import {
  Medication,
  MedicationHistory,
  MedicationHistoryEntry,
  MedicationHistoryEntryUpdateParams,
  MedicationSchedule,
  MedicationUpdateParams,
  Schedule,
} from '../../typings/medication';

// Service implementation.
const api = {

  createMedication(
    medication : Medication,
  ) : Promise<FirebaseDocumentRef> {
    return this.medicationFirebaseCollection().add({
      user: userAPI.currentUserDocument(),
      ...medication,
    });
  },

  createMedicationAlarm(
    medicationUID : string,
    newAlarm : Schedule,
  ) : Promise<void> {
    return new Promise((resolve, reject) => {
      this.getMedication(medicationUID)
        .then((medication) => {
          resolve(
            this.updateMedication(medicationUID, {
              alarms: [...medication.alarms, newAlarm],
            }),
          );
        })
        .catch((err) => reject(err));
    });
  },

  createMedicationHistoryEntry(
    medicationUID : string,
    medicationHistoryEntry : MedicationHistoryEntry,
  ) : Promise<FirebaseDocumentRef> {
    return this.medicationHistoryEntryFirebaseCollection().add({
      medication: this.medicationDocument(medicationUID),
      ...medicationHistoryEntry,
    });
  },

  createMedicationSchedule(
    medicationUID : string,
    newSchedule : Schedule,
  ) : Promise<void> {
    return new Promise((resolve, reject) => {
      this.getMedication(medicationUID)
        .then((medication) => {
          resolve(
            this.updateMedication(medicationUID, {
              schedule: [...medication.schedule, newSchedule],
            }),
          );
        })
        .catch((err) => reject(err));
    });
  },

  deleteMedication(medicationUID : string) : Promise<void> {
    return this.medicationDocument(medicationUID).delete();
  },

  deleteMedicationHistoryEntry(
    medicationHistoryEntryUID : string,
  ) : Promise<void> {
    return this.medicationHistoryEntryDocument(medicationHistoryEntryUID)
      .delete();
  },

  getCurrentUserAlarms(): Promise<Array<MedicationSchedule>> {
    return new Promise((resolve, reject) => {
      this.getCurrentUserMedications()
        .then((userMedications) => {
          const userAlarms: Array<MedicationSchedule> = [];

          userMedications.forEach((userMedication) => {
            userMedication.alarms
              .sort(sortSchedules)
              .forEach((medicationAlarm) => {
                userAlarms.push({
                  id: uuid(),
                  medicationId: userMedication.id,
                  medicationData: userMedication.data,
                  schedule: medicationAlarm,
                });
              });
          });

          resolve(userAlarms);
        })
        .catch((err) => reject(err));
    });
  },

  getCurrentUserMedications(): Promise<Array<Medication>> {
    return new Promise((resolve, reject) => {
      this.medicationFirebaseCollection()
        .where('user', '==', userAPI.currentUserDocument())
        .get()
        .then((userMedications) => {
          resolve(
            userMedications.docs.map((userMedicationDoc) => {
              const userMedicationDocData = userMedicationDoc.data();

              return ({
                id: userMedicationDoc.id,
                alarms: userMedicationDocData.alarms,
                data: userMedicationDocData.data,
                schedule: userMedicationDocData.schedule,
                stock: userMedicationDocData.stock,
              });
            }),
          );
        })
        .catch((err) => reject(err));
    });
  },

  getMedication(
    medicationUID : string,
  ) : Promise<Medication> {
    return new Promise((resolve, reject) => {
      this.medicationDocument(medicationUID).get()
        .then((medication) => {
          const medicationData = medication.data();
          if (medicationData !== undefined) {
            resolve({
              id: medication.id,
              alarms: medicationData.alarms,
              data: medicationData.data,
              schedule: medicationData.schedule,
              stock: medicationData.stock,
            });
          } else {
            reject(new Error('No data found for given medication UID.'));
          }
        })
        .catch((err) => reject(err));
    });
  },

  getMedicationHistory(
    medicationUID : string,
  ) : Promise<MedicationHistory> {
    return new Promise((resolve, reject) => {
      this.medicationHistoryEntryFirebaseCollection()
        .where('medication', '==', this.medicationDocument(medicationUID))
        .orderBy('datetime', 'desc')
        .get()
        .then(
          (medicationHistoryEntries) => {
            resolve({
              medicationUID,
              history: medicationHistoryEntries.docs.map(
                (historyEntry) => {
                  const historyEntryData = historyEntry.data();
                  return ({
                    datetime: historyEntryData.datetime.toDate(),
                    medicated: historyEntryData.medicated,
                    quantity: historyEntryData.quantity,
                  });
                },
              ),
            });
          },
        )
        .catch((err) => reject(err));
    });
  },

  medicationDocument(medicationUID : string | undefined) : FirebaseDocumentRef {
    return this.medicationFirebaseCollection().doc(medicationUID);
  },

  medicationHistoryEntryDocument(
    medicationHistoryEntryUID : string | undefined,
  ) : FirebaseDocumentRef {
    return this.medicationHistoryEntryFirebaseCollection()
      .doc(medicationHistoryEntryUID);
  },

  medicationFirebaseCollection() : FirebaseCollection {
    return firestore().collection('medications');
  },

  medicationHistoryEntryFirebaseCollection() : FirebaseCollection {
    return firestore().collection('medicationHistoryEntries');
  },

  updateMedication(
    medicationUID : string,
    medicationData : MedicationUpdateParams,
  ) : Promise<void> {
    return this.medicationDocument(medicationUID).set({
      ...medicationData,
    }, { merge: true });
  },

  updateMedicationHistoryEntry(
    medicationHistoryEntryUID : string,
    medicationHistoryEntryData : MedicationHistoryEntryUpdateParams,
  ) : Promise<void> {
    return this.medicationHistoryEntryDocument(medicationHistoryEntryUID).set({
      ...medicationHistoryEntryData,
    }, { merge: true });
  },

};

// Export default.
export default api;
