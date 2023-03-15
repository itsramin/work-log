import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { dataActions } from "../store/dataSlice";
import { convert2Date, convert2Time } from "../util/helper";

const Btn = ({ title, status }) => {
  const dispatch = useDispatch();
  const dataSlice = useSelector((state) => state.data);
  const btnHandler = () => {
    const now = new Date();
    const formattedDate = convert2Date(now);
    const formattedTime = convert2Time(now);

    // const target = dataSlice.list.find(
    //   (log) => log.date === formattedDate && log.status === status
    // );

    // if (target) return toast.error(`Status "${status}" is exist for today.`);

    const newData = {
      id: +now,
      date: formattedDate,
      time: formattedTime,
      timeStamp: +now,
      status: status,
    };
    dispatch(dataActions.add(newData));
  };
  return (
    <Button onClick={btnHandler} variant="contained" size="large">
      {title}
    </Button>
  );
};

export default Btn;
// return (
//   <div onClick={btnHandler} className="btn">
//     {title}
//   </div>
// );
