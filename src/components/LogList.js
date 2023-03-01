import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataItem from "./DataItem";

const LogList = () => {
  const dataSlice = useSelector((state) => state.data);

  const [loadedLogs, setLoadedLogs] = useState([]);

  useEffect(() => {
    setLoadedLogs(dataSlice.list);
    if (dataSlice.dateFilter) {
      setLoadedLogs((prev) =>
        [...prev].filter((item) => item.date === dataSlice.dateFilter)
      );
    }

    if (dataSlice.statusFilter) {
      setLoadedLogs((prev) =>
        [...prev].filter((item) => item.status === dataSlice.statusFilter)
      );
    }
  }, [dataSlice]);

  return (
    <div>
      {loadedLogs.map((item) => (
        <DataItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default LogList;
