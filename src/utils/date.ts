export const getLastDayInMonth = (dateInMs: number) => {
  const today = new Date(dateInMs);
  return new Date(today.getFullYear(), today.getMonth() + 1, 0);
};

export const formatDate = (dateInMs: number) => new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'short',
}).format(new Date(dateInMs)).slice(0, -1);

export const areDatesEqual = (dateInMs1: number, dateInMs2: number) => {
  const intl = new Intl.DateTimeFormat('ru-RU');
  return intl.format(new Date(dateInMs1)) === intl.format(new Date(dateInMs2));
};

export const getMonday = (dateOrMs: Date | number) => {
  const date = dateOrMs instanceof Date ? dateOrMs : new Date(dateOrMs);
  const offset = date.getDay() === 0 ? -7 : 0;
  date.setDate(date.getDate() - date.getDay() + 1 + offset);
  return date;
};

export const getDatesOfWeek = (dateOrMs: Date | number) => {
  const date = new Date(dateOrMs);
  const monday = getMonday(date);
  const week = [];
  for (let i = 0; i < 7; i += 1) {
    const dayOfTheWeek = new Date(monday);
    dayOfTheWeek.setDate(dayOfTheWeek.getDate() + i);
    dayOfTheWeek.setHours(0, 0, 0, 0);
    week.push(dayOfTheWeek);
  }
  return week;
};

export const dateInThisWeek = (dateOrMs: Date | number, weekDate: Date | number) => {
  const date = new Date(dateOrMs);
  const week = getDatesOfWeek(weekDate);
  return week[0] < date && date < week[week.length - 1];
};

const compareDates = (greaterThan: boolean) => (
  (dateOrMs: Date | number, comparedDate: Date | number = new Date()) => {
    const date1 = new Date(dateOrMs);
    const date2 = new Date(comparedDate);
    if (greaterThan) {
      date2.setHours(23, 59, 59, 999);
      return date1 > date2;
    }
    date2.setHours(0, 0, 0, 0);
    return date1 < date2;
  }
);

export const isFutureDate = compareDates(true);

export const isPastDate = compareDates(false);

export const getLastWeeksDate = (dateOrMs: number | Date = new Date()) => {
  const date = new Date(dateOrMs);
  date.setDate(date.getDate() - 7);
  return date;
};

export const getNextWeeksDate = (dateOrMs: number | Date = new Date()) => {
  const date = new Date(dateOrMs);
  date.setDate(date.getDate() + 7);
  return date;
};
