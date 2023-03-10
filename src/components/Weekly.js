import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Weekly = () => {
  const dataSlice = useSelector((state) => state.data);

  const initArr = [
    { weekName: "Sat" },
    { weekName: "Sun" },
    { weekName: "Mon" },
    { weekName: "Tue" },
    { weekName: "Wen" },
    { weekName: "The" },
    { weekName: "Fri" },
  ];

  const [weekArr, setWeekArr] = useState(initArr);
  const [sumWork, setSumWork] = useState(0);

  const futureDate = (saturday, days) => {
    const thisSaturday = +new Date(saturday);
    return new Date(thisSaturday + days * 24 * 60 * 60 * 1000);
  };

  useEffect(() => {
    const todayWeekday = new Date().getDay();
    const saturday = new Date(
      new Date().setDate(new Date().getDate() - todayWeekday - 1)
    );
    console.log(saturday);

    const newArr = [...weekArr];
    newArr.forEach((day, i) => {
      const calcDate = futureDate(saturday, i).toISOString().slice(0, 10);
      day.date = calcDate;

      const targetIn = dataSlice.list.find(
        (log) => log.date === calcDate && log.status === "in"
      );
      day.in = targetIn ? targetIn.time : "";
      const targetout = dataSlice.list.find(
        (log) => log.date === calcDate && log.status === "out"
      );
      day.out = targetout ? targetout.time : "";
      day.workTime =
        targetout &&
        targetIn &&
        new Date(
          (+targetout.time.slice(0, 2) * 60 +
            +targetout.time.slice(3, 5) -
            (+targetIn.time.slice(0, 2) * 60 + +targetIn.time.slice(3, 5))) *
            60 *
            1000
        )
          .toISOString()
          .slice(11, 16);
    });

    const newSum = newArr.reduce((sum, cur) => {
      if (cur.workTime) {
        return sum + +cur.workTime.slice(0, 2) * 60 + +cur.workTime.slice(3, 5);
      }
      return sum;
    }, 0);
    setSumWork(newSum);
    setWeekArr(newArr);
  }, [dataSlice]);

  return (
    <div className="weekContainer">
      <div className="weekHeaderContainer">
        <div className="weekHeader">Day</div>
        <div className="weekHeader">Date</div>
        <div className="weekHeader">In</div>
        <div className="weekHeader">Out</div>
        <div className="weekHeader">Work</div>
      </div>
      {weekArr.map((day) => {
        return (
          <div key={day.weekName} className="weekItem">
            <div className="weekCol">{day.weekName}</div>
            <div className="weekCol">{day.date?.slice(2, 10)}</div>
            <div className="weekCol">{day.in?.slice(0, 5)}</div>
            <div className="weekCol">{day.out?.slice(0, 5)}</div>
            <div className="weekCol">{day.out && day.workTime}</div>
          </div>
        );
      })}
      <div className="weekSumContainer">
        <div className="weekSum">
          Sum {Math.floor(sumWork / 60)}:
          {(sumWork - Math.floor(sumWork / 60) * 60).toString().padStart(2, 0)}
        </div>
      </div>
    </div>
  );
};

export default Weekly;
