import { useSelector } from "react-redux";
import { convert2Date, convert2Time } from "../../../util/helper";

import styles from "./index.module.css";

const DataItem = (props) => {
  const rowClass = `${styles["item-row"]} ${
    props.item.status === "in"
      ? styles.green
      : props.item.status === "out"
      ? styles.red
      : styles.yellow
  }`;
  const uiSlice = useSelector((state) => state.ui);

  const time = convert2Time(props.item.timeStamp, uiSlice.langOption);
  const date = convert2Date(props.item.timeStamp, uiSlice.langOption);
  const dayWeek = new Intl.DateTimeFormat(uiSlice.langOption, {
    weekday: "short",
  }).format(new Date(props.item.timeStamp));

  const statusObj = {
    in: { label: "In", faLabel: "ورود" },
    out: { label: "Out", faLabel: "خروج" },
    leave: { label: "Leave", faLabel: "مرخصی" },
  };
  return (
    <div className={rowClass}>
      <input
        type="checkbox"
        onChange={props.onCheckbox.bind(null, props.item.id)}
        checked={props.isSelected}
        className={styles["item-checkbox"]}
      />
      <div>{dayWeek}</div>
      <div>{date}</div>
      <div>{time}</div>
      <div>
        {uiSlice.language === "Fa"
          ? statusObj[props.item.status].faLabel
          : statusObj[props.item.status].label}
      </div>
    </div>
  );
};

export default DataItem;
