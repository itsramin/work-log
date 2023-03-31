import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../store/dataSlice";
import DataItem from "./DataItem";
import FilterLogs from "./FilterLogs";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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

  useEffect(() => {
    setSelectedList([]);
  }, [dataSlice]);

  return (
    <div>
      <FilterLogs />

      <div className="list-header">
        {selectList.length === 0 && (
          <>
            <input type="checkbox" />
            <div className="item-weekday">Day</div>
            <div className="item-date">Date</div>
            <div className="item-time">Time</div>
            <div className="item-status">Status</div>
          </>
        )}
        {selectList.length > 0 && (
          <div className="list-actions">
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
        {/* <DataTable list={loadedLogs} /> */}
        {/* <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">Day</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Time</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loadedLogs.map((row, i) => (
                // <TableRow key={row.id} selected={selectedRow === row.id}>
                //   <TableCell component="th" scope="row">
                //     {row.name}
                //   </TableCell>
                //   <TableCell align="right">{row.calories}</TableCell>
                //   <TableCell align="right">{row.fat}</TableCell>
                //   <TableCell align="right">{row.carbs}</TableCell>
                //   <TableCell align="right">{row.protein}</TableCell>
                //   <TableCell align="right">
                //     <IconButton
                //       aria-label="edit"
                //       onClick={() => handleEdit(row.id)}
                //     >
                //       <EditIcon />
                //     </IconButton>
                //     <IconButton
                //       aria-label="delete"
                //       onClick={() => handleDelete(row.id)}
                //     >
                //       <DeleteIcon />
                //     </IconButton>
                //   </TableCell>
                // </TableRow>
                <DataItem
                  key={i}
                  item={row}
                  onCheckbox={checkHandler}
                  isSelected={selectList.includes(row.id)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
      </div>
    </div>
  );
};

export default LogList;
