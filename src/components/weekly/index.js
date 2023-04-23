import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { calcWorkTime, convert2Date, convert2Time } from "../../util/helper";

import styles from "./index.module.css";
const Weekly = () => {
  const dataSlice = useSelector((state) => state.data);
  const uiSlice = useSelector((state) => state.ui);

  const initArr = [
    { dayId: 0 },
    { dayId: 1 },
    { dayId: 2 },
    { dayId: 3 },
    { dayId: 4 },
    { dayId: 5 },
    { dayId: 6 },
  ];

  const [weekArr, setWeekArr] = useState(initArr);
  const [sumWork, setSumWork] = useState(0);

  const futureDate = (saturday, days) => {
    const thisSaturday = +new Date(saturday);
    return new Date(thisSaturday + days * 24 * 60 * 60 * 1000);
  };

  useEffect(() => {
    const todayWeekday = new Date().getDay();

    const saturday =
      todayWeekday === 6
        ? new Date()
        : new Date(new Date().setDate(new Date().getDate() - todayWeekday - 1));

    const newArr = [...weekArr];
    newArr.forEach((day, i) => {
      const calcDate = convert2Date(
        futureDate(saturday, i),
        uiSlice.langOption
      );
      day.date = calcDate;

      day.weekday = new Intl.DateTimeFormat(uiSlice.langOption, {
        weekday: "short",
      }).format(futureDate(saturday, i));

      const targetIn = dataSlice.list.find(
        (log) =>
          convert2Date(log.timeStamp, uiSlice.langOption) === calcDate &&
          log.status === "in"
      );

      day.in = targetIn
        ? convert2Time(targetIn.timeStamp, uiSlice.langOption)
        : "";

      const targetout = dataSlice.list.find(
        (log) =>
          convert2Date(log.timeStamp, uiSlice.langOption) === calcDate &&
          log.status === "out"
      );
      day.out = targetout
        ? convert2Time(targetout.timeStamp, uiSlice.langOption)
        : "";

      if (targetout && targetIn) {
        day.workTime =
          Math.floor(targetout.timeStamp / 1000 / 60) -
          Math.floor(targetIn.timeStamp / 1000 / 60);
      }

      const targetLeave = dataSlice.list.find(
        (log) =>
          convert2Date(log.timeStamp, uiSlice.langOption) === calcDate &&
          log.status === "leave"
      );

      day.leave = targetLeave ? true : false;
    });

    setWeekArr(newArr);
  }, [dataSlice, uiSlice]);

  useEffect(() => {
    const newSum = weekArr.reduce((sum, cur) => {
      if (cur.workTime) {
        return sum + +cur.workTime;
      }
      return sum;
    }, 0);
    setSumWork(newSum);
  }, [weekArr]);

  const workTimeClass = `${styles.weekCol} ${
    uiSlice.language === "Fa" && "fa-number"
  }`;
  const workSumClass = `${styles.weekSum} ${
    uiSlice.language === "Fa" && "fa-number"
  }`;

  return (
    <div className={styles.weekContainer}>
      <div className={styles.weekHeaderContainer}>
        <div className={styles.weekHeader}>Day</div>
        <div className={styles.weekHeader}>Date</div>
        <div className={styles.weekHeader}>In</div>
        <div className={styles.weekHeader}>Out</div>
        <div className={styles.weekHeader}>Work</div>
      </div>
      {weekArr.map((day) => {
        return (
          <div key={day.dayId} className={styles.weekItem}>
            <div className={styles.weekCol}>{day.weekday}</div>
            <div className={styles.weekCol}>{day.date}</div>
            {day.leave ? (
              <>
                <div className={styles.weekCol}></div>
                <div className={styles.weekCol}>
                  {uiSlice.language === "Fa" ? "مرخصی" : "Leave"}
                </div>
                <div className={styles.weekCol}></div>
              </>
            ) : (
              <>
                <div className={styles.weekCol}>{day.in}</div>
                <div className={styles.weekCol}>{day.out}</div>
                <div className={workTimeClass}>
                  {day.in && day.out && calcWorkTime(day.workTime)}
                </div>
              </>
            )}
          </div>
        );
      })}
      <div className={styles.weekSumContainer}>
        <div className={workSumClass}>
          {`
          ${uiSlice.language === "Fa" ? "جمع" : "Sum"} ${calcWorkTime(sumWork)}
          `}
        </div>
      </div>
    </div>
  );
};

export default Weekly;
