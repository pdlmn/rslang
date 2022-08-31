export const shadowFromMultipler = (multipler: number) => {
  const colors = ['grey', 'green', 'yellow', 'orange', 'red'];

  return `1px 1px ${multipler * 2}px ${colors[multipler - 1]}`;
};
