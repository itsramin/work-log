export const convert2Date = (value, lngOpt) => {
  const formattedDate = new Intl.DateTimeFormat(lngOpt, {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).format(value);

  return formattedDate;
};

export const convert2Time = (value, lngOpt) => {
  const formattedDate = new Intl.DateTimeFormat(lngOpt, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Tehran",
  }).format(value);

  return formattedDate;
};
export const calcWorkTime2 = (inTime, outTime, opt) => {
  const outMin = Math.floor(outTime / 1000 / 60);
  const inMin = Math.floor(inTime / 1000 / 60);
  const offset = new Date().getTimezoneOffset();
  const diff = new Date((outMin - inMin + offset) * 60 * 1000);
  return new Intl.DateTimeFormat(opt, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(diff);
};
export const calcWorkTime = (minTime) => {
  // const secDiff = (+outTime - +inTime) / 1000;
  const resHour = Math.floor(+minTime / 60)
    .toString()
    .padStart(2, 0);
  const resMin = Math.floor(+minTime - resHour * 60)
    .toString()
    .padStart(2, 0);

  return `${resHour}:${resMin}`;
};

export const calcWorkTimeArr = (arr) => {
  const timsArr = arr.filter((item) => item.work).map((item) => item.work);
  const mins = timsArr.reduce((sum, cur) => sum + +cur.slice(3, 5), 0);
  const hoursInMin =
    timsArr.reduce((sum, cur) => sum + +cur.slice(0, 2), 0) * 60;

  return calcWorkTime(mins + hoursInMin);
};
