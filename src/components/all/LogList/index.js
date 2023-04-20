import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../../store/dataSlice";
import DataItem from "../DataItem";
import FilterLogs from "../FilterLogs";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./index.module.css";

const LogList = () => {
  const dataSlice = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const [loadedLogs, setLoadedLogs] = useState([]);
  const [selectList, setSelectedList] = useState([]);

  const checkHandler = (newId) => {
    if (selectList.includes(newId)) {
      setSelectedList((prev) => prev.filter((item) => item !== newId));
    } else {
      setSelectedList((prev) => [...prev, newId]);
    }
  };
  const deleteHandler = () => {
    dispatch(dataActions.setDeleteIds(selectList));
  };
  const editHandler = () => {
    dispatch(dataActions.setEditId({ id: selectList[0] }));
  };

  useEffect(() => {
    setLoadedLogs(dataSlice.list);
    if (dataSlice.date1Filter && dataSlice.date2Filter) {
      setLoadedLogs((prev) =>
        [...prev].filter(
          (item) =>
            item.timeStamp >= +new Date(dataSlice.date1Filter) - 10 &&
            item.timeStamp <
              +new Date(+new Date(dataSlice.date2Filter) + 24 * 60 * 60 * 1000)
        )
      );
    } else if (dataSlice.date1Filter) {
      setLoadedLogs((prev) =>
        [...prev].filter(
          (item) => item.timeStamp >= +new Date(dataSlice.date1Filter) - 10
        )
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

  useEffect(() => {
    setSelectedList([]);
  }, [dataSlice]);

  return (
    <div>
      <FilterLogs />

      <div className={styles["list-header"]}>
        {selectList.length === 0 && (
          <>
            <input type="checkbox" />
            <div>Day</div>
            <div>Date</div>
            <div>Time</div>
            <div>Status</div>
          </>
        )}
        {selectList.length > 0 && (
          <div className={styles["list-actions"]}>
            <IconButton
              onClick={deleteHandler}
              aria-label="delete"
              size="small"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>

            {selectList.length === 1 && (
              <IconButton
                onClick={editHandler}
                aria-label="delete"
                size="small"
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            )}
          </div>
        )}
      </div>

      <div>
        {loadedLogs.map((item) => (
          <DataItem
            item={item}
            key={item.id}
            onCheckbox={checkHandler}
            isSelected={selectList.includes(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default LogList;
