export const timeFormat = (date) => {
  if (!date) return '00:00:00';

  let mm = date.getUTCMinutes();
  let ss = date.getSeconds();
  let cm = Math.round(date.getMilliseconds() / 10);

  mm = mm < 10 ? '0' + mm : mm;
  ss = ss < 10 ? '0' + ss : ss;
  cm = cm < 10 ? '0' + cm : cm;

  return `${mm}:${ss}:${cm}`;
};
