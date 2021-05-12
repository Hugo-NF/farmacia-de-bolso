export const medicationData = {
  name: 'ACETATO DE MEDROXIPROGESTERONA 1',
  unit: 'Ampolas',
};

export const schedules = [
  {
    id: 1, days: 'Dom, Seg, Ter', time: '14:30', quantity: 2,
  },
  {
    id: 2, days: 'Dom, Seg, Ter', time: '19:30', quantity: 2,
  },
  {
    id: 3, days: 'Sab', time: '19:30', quantity: 2,
  },
];

export const alarms = [
  {
    id: 1, days: 'Dom, Seg, Ter', time: '14:30', quantity: 2,
  },
  {
    id: 2, days: 'Dom, Seg, Ter', time: '19:30', quantity: 2,
  },
];

export const stock = 5;

export const historic = [
  {
    id: 1, datetime: 'Seg (26/03) - 19:30', quantity: 2, medicated: true,
  },
  {
    id: 2, datetime: 'Seg (26/03) - 14:30', quantity: 2, medicated: true,
  },
  {
    id: 3, datetime: 'Dom (25/03) - 19:30', quantity: 2, medicated: false,
  },
  {
    id: 4, datetime: 'Dom (25/03) - 14:30', quantity: 2, medicated: true,
  },
];
