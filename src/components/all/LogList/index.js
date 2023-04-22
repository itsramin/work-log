import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataItem from "../DataItem";
import FilterLogs from "../FilterLogs";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./index.module.css";
import { HEADER_ARR, LANG_OBJ } from "../../../util/labels";

import DataForm from "../DataForm";
import DeleteModal from "../DeleteModal";

const LogList = () => {
  const dataSlice = useSelector((state) => state.data);
  const uiSlice = useSelector((state) => state.ui);

  const [loadedLogs, setLoadedLogs] = useState([]);
  const [selectList, setSelectedList] = useState([]);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  const checkHandler = (newId) => {
    if (selectList.includes(newId)) {
      setSelectedList((prev) => prev.filter((item) => item !== newId));
    } else {
      setSelectedList((prev) => [...prev, newId]);
    }
  };
  const checkAllHandler = () => {
    const allIds = loadedLogs.map((log) => log.id);
    if (selectList.length === allIds.length) {
      setSelectedList([]);
    } else {
      setSelectedList(allIds);
    }
  };
  const handleCloseEdit = () => {
    setEditIsOpen(false);
  };
  const handleOpenEdit = () => {
    setEditIsOpen(true);
  };
  const handleCloseDelete = () => {
    setDeleteIsOpen(false);
  };
  const handleOpenDelete = () => {
    setDeleteIsOpen(true);
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
        <input
          type="checkbox"
          onChange={checkAllHandler}
          checked={
            selectList.length === loadedLogs.length && selectList.length !== 0
          }
        />
        {selectList.length === 0 && (
          <>
            {HEADER_ARR.map((item, i) => (
              <div key={i}>{item[LANG_OBJ[uiSlice.language]]}</div>
            ))}
          </>
        )}
        {selectList.length > 0 && (
          <>
            <div className={styles["list-actions"]}>
              <IconButton
                onClick={handleOpenDelete}
                aria-label="delete"
                size="small"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>

              {selectList.length === 1 && (
                <IconButton
                  onClick={handleOpenEdit}
                  aria-label="edit"
                  size="small"
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
              )}
            </div>
          </>
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
      {editIsOpen && (
        <DataForm
          target={dataSlice.list.find((i) => i.id === selectList[0])}
          isOpen={editIsOpen}
          onClose={handleCloseEdit}
        />
      )}
      {deleteIsOpen && (
        <DeleteModal
          isOpen={deleteIsOpen}
          onClose={handleCloseDelete}
          ids={selectList}
        />
      )}
    </div>
  );
};

export default LogList;
