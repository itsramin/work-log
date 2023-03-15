export const convert2Date = (value) => {
  const formattedDate = new Date(value);
  const year = formattedDate.getFullYear();
  const month = (formattedDate.getMonth() + 1).toString().padStart(2, 0);
  const day = formattedDate.getDate().toString().padStart(2, 0);

  return `${year}-${month}-${day}`;
};

export const convert2Time = (value, full = true) => {
  const formattedDate = new Date(value);

  const hour = formattedDate.getHours().toString().padStart(2, 0);
  const min = formattedDate.getMinutes().toString().padStart(2, 0);
  const sec = formattedDate.getSeconds().toString().padStart(2, 0);

  return `${hour}:${min}${full ? ":" + sec : ""}`;
};
export const calcWorkTime = (inTime, outTime) => {
  const inTimeSec =
    +inTime.split(":")[0] * 60 * 60 +
    +inTime.split(":")[1] * 60 +
    +inTime.split(":")[2];

  const outTimeSec =
    +outTime.split(":")[0] * 60 * 60 +
    +outTime.split(":")[1] * 60 +
    +outTime.split(":")[2];

  const secDiff = outTimeSec - inTimeSec;

  return showTime(secDiff);
};

export const showTime = (sec) => {
  const resHour = Math.floor(sec / 3600)
    .toString()
    .padStart(2, 0);
  const resMin = Math.floor((sec - resHour * 3600) / 60)
    .toString()
    .padStart(2, 0);

  return `${resHour}:${resMin}`;
};
