export const getDateParameters = (fullDate) => {
  if (!fullDate)
    return {
      startTime: 0,
      day: 0,
      year: 0,
      month: 0,
    };
  const startTime = fullDate.split('T')[1].slice(0, 5);

  const date = new Date(fullDate);
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();

  return { startTime, day, year, month };
};
