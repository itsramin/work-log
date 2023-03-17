import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { dataActions } from "../store/dataSlice";

const Btn = ({ title, status }) => {
  const dispatch = useDispatch();
  const btnHandler = () => {
    const now = new Date();

    const newData = {
      id: +now,
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
