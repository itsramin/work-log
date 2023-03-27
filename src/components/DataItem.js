import { useSelector } from "react-redux";
import { convert2Date, convert2Time } from "../util/helper";

const DataItem = (props) => {
  const rowClass = `item-row ${props.item.status === "in" ? "green" : "red"}`;
  const uiSlice = useSelector((state) => state.ui);

  const time = convert2Time(props.item.timeStamp, uiSlice.langOption);
  const date = convert2Date(props.item.timeStamp, uiSlice.langOption);
  const dayWeek = new Intl.DateTimeFormat(uiSlice.langOption, {
    weekday: "short",
  }).format(new Date(props.item.timeStamp));
  return (
    <div className={rowClass}>
      <input
        type="checkbox"
        onChange={props.onCheckbox.bind(null, props.item.id)}
        checked={props.isSelected}
      />
      <div className="item-weekday">{dayWeek}</div>
      <div className="item-date">{date}</div>
      <div className="item-time">{time}</div>
      <div className="item-status">{props.item.status}</div>
    </div>
  );
};

export default DataItem;
