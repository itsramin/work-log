export const convert2Date = (value) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).format(value);

  return formattedDate;
};

export const convert2Time = (value) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(value);

  return formattedDate;
};
export const calcWorkTime = (inTime, outTime) => {
  const secDiff = (+outTime - +inTime) / 1000;
  const resHour = Math.floor(+secDiff / 3600)
    .toString()
    .padStart(2, 0);
  const resMin = Math.floor((+secDiff - resHour * 3600) / 60)
    .toString()
    .padStart(2, 0);

  return `${resHour}:${resMin}`;
};
