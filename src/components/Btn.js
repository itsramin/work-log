import { useDispatch } from "react-redux";
import { dataActions } from "../store/dataSlice";

const Btn = ({ title, status }) => {
  const dispatch = useDispatch();
  const btnHandler = () => {
    const now = new Date();

    const newData = {
      id: +now,
      date: now.toISOString().slice(0, 10),
      time: now.toTimeString().slice(0, 8),
      timeStamp: +now,
      status: status,
    };
    dispatch(dataActions.add(newData));
  };
  return (
    <div onClick={btnHandler} className="btn">
      {title}
    </div>
  );
};

export default Btn;
