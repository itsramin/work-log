import { useSelector } from "react-redux";
import DataItem from "./DataItem";

const LogList = () => {
  const dataSlice = useSelector((state) => state.data);

  return (
    <div>
      {dataSlice.list.map((item) => (
        <DataItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default LogList;
