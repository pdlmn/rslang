export const getLastDayInMonth = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth() + 1, 0);
};

export const formatDate = (date: number) => new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'short',
}).format(new Date(date)).slice(0, -1);
