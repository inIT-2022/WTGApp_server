export const getDateParameters = (fullDate) => {
  if (!fullDate)
    return {
      startTime: '',
      day: '',
      year: '',
      month: '',
    };
  const startTime = fullDate.split('T')[1].slice(0, 5);

  const date = new Date(fullDate);
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();

  return { startTime, day, year, month };
};
