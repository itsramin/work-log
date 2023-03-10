import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { dataActions } from "../store/dataSlice";

const Btn = ({ title, status }) => {
  const dispatch = useDispatch();
  const dataSlice = useSelector((state) => state.data);
  const btnHandler = () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, 0)}-${now.getDate()}`;

    const target = dataSlice.list.find(
      (log) => log.date === formattedDate && log.status === status
    );

    if (target) return toast.error(`Status "${status}" is exist for today.`);

    const newData = {
      id: +now,
      date: formattedDate,
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
