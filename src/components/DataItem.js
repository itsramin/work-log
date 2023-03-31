import { useSelector } from "react-redux";
import { convert2Date, convert2Time } from "../util/helper";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
} from "@mui/material";
const DataItem = (props) => {
  const rowClass = `item-row ${
    props.item.status === "in"
      ? "green"
      : props.item.status === "out"
      ? "red"
      : "yellow"
  }`;
  const uiSlice = useSelector((state) => state.ui);

  const time = convert2Time(props.item.timeStamp, uiSlice.langOption);
  const date = convert2Date(props.item.timeStamp, uiSlice.langOption);
  const dayWeek = new Intl.DateTimeFormat(uiSlice.langOption, {
    weekday: "short",
  }).format(new Date(props.item.timeStamp));
  return (
    <div className={rowClass}>
      <input
        type="checkbox"
        onChange={props.onCheckbox.bind(null, props.item.id)}
        checked={props.isSelected}
        className="item-checkbox"
      />
      <div className="item-weekday">{dayWeek}</div>
      <div className="item-date">{date}</div>
      <div className="item-time">{time}</div>
      <div className="item-status">{props.item.status}</div>
    </div>
    // <TableRow
    //   hover
    //   onClick={(event) => handleClick(event, props.item.id)}
    //   role="checkbox"
    //   aria-checked={isItemSelected}
    //   tabIndex={-1}
    //   key={props.item.id}
    //   selected={isItemSelected}
    //   sx={{ cursor: "pointer" }}
    // >
    //   <TableCell padding="checkbox">
    //     <Checkbox
    //       color="primary"
    //       checked={isItemSelected}
    //       inputProps={{
    //         "aria-labelledby": labelId,
    //       }}
    //     />
    //   </TableCell>
    //   <TableCell component="th" align="center" scope="row">
    //     {dayWeek}
    //   </TableCell>
    //   <TableCell align="center">{date}</TableCell>
    //   <TableCell align="center">{time}</TableCell>
    //   <TableCell align="center">{props.item.status}</TableCell>
    // </TableRow>
    // <TableRow>
    //   <TableCell padding="checkbox">
    //     <Checkbox
    //       checked={props.isSelected}
    //       onChange={props.onCheckbox.bind(null, props.item.id)}
    //       inputProps={{ "aria-label": `select row ${props.item.id}` }}
    //     />
    //   </TableCell>
    //   <TableCell component="th" align="center" scope="row">
    //     {dayWeek}
    //   </TableCell>
    //   <TableCell align="center">{date}</TableCell>
    //   <TableCell align="center">{time}</TableCell>
    //   <TableCell align="center">{props.item.status}</TableCell>
    //   {/* <TableCell align="right">
    //     <IconButton aria-label="edit" onClick={() => handleEdit(row.id)}>
    //       <EditIcon />
    //     </IconButton>
    //     <IconButton aria-label="delete" onClick={() => handleDelete(row.id)}>
    //       <DeleteIcon />
    //     </IconButton>
    //   </TableCell> */}
    // </TableRow>
  );
};

export default DataItem;
