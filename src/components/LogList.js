import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataItem from "./DataItem";
import FilterLogs from "./FilterLogs";

const LogList = () => {
  const dataSlice = useSelector((state) => state.data);

  const [loadedLogs, setLoadedLogs] = useState([]);

  useEffect(() => {
    setLoadedLogs(dataSlice.list);
    if (dataSlice.date1Filter && dataSlice.date2Filter) {
      setLoadedLogs((prev) =>
        [...prev].filter(
          (item) =>
            item.timeStamp >= +new Date(dataSlice.date1Filter) - 10 &&
            item.timeStamp <
              +new Date(
                dataSlice.date2Filter.slice(0, 8) +
                  (+dataSlice.date2Filter.slice(8, 10) + 1)
              )
        )
      );
    } else if (dataSlice.date1Filter) {
      setLoadedLogs((prev) =>
        [...prev].filter((item) => item.date === dataSlice.date1Filter)
      );
    }

    if (dataSlice.statusFilter) {
      setLoadedLogs((prev) =>
        [...prev].filter((item) => item.status === dataSlice.statusFilter)
      );
    }
    if (dataSlice.sort === "Az") {
      setLoadedLogs((prev) =>
        [...prev].sort((a, b) => a.timeStamp - b.timeStamp)
      );
    }
    if (dataSlice.sort === "Za") {
      setLoadedLogs((prev) =>
        [...prev].sort((a, b) => b.timeStamp - a.timeStamp)
      );
    }
  }, [dataSlice]);

  return (
    <div>
      <FilterLogs />
      <div>
        {loadedLogs.map((item) => (
          <DataItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default LogList;
