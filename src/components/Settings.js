import { Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as XLSX from "xlsx/xlsx.mjs";
import { dataActions } from "../store/dataSlice";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Settings = () => {
  const dataSlice = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const generateCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataSlice.list);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
    XLSX.writeFile(workbook, "Logs.xlsx", { compression: true });
  };
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        if (
          json[0].hasOwnProperty("date") &&
          json[0].hasOwnProperty("id") &&
          json[0].hasOwnProperty("time") &&
          json[0].hasOwnProperty("timeStamp") &&
          json[0].hasOwnProperty("status") &&
          json.length > 0
        ) {
          toast.success("Import successfully!");
          dispatch(dataActions.import(json));
        } else {
          toast.error("File is incorrect!");
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const deleteAllHandler = () => {
    dispatch(dataActions.deleteAll());
    toast.success("All logs deleted!");
  };
  return (
    <nav aria-label="main mailbox folders">
      <List>
        <ListItem disablePadding>
          <ListItemButton component="label">
            <ListItemIcon>
              <FileUploadIcon />
            </ListItemIcon>
            <ListItemText
              primary="Import logs"
              secondary="Import logs from .xlsx file"
            />
            <input hidden type="file" onChange={readUploadFile} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={generateCSV}>
            <ListItemIcon>
              <FileDownloadIcon />
            </ListItemIcon>
            <ListItemText
              primary="Export logs"
              secondary="Export logs to .xlsx file"
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={deleteAllHandler}>
            <ListItemIcon>
              <DeleteForeverIcon />
            </ListItemIcon>
            <ListItemText
              primary="Delete all logs"
              secondary="All your logs will be deleted."
            />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </nav>

    // <Stack
    //   direction="row"
    //   alignItems="center"
    //   justifyContent="center"
    //   spacing={2}
    // >
    //   <Button variant="contained" onClick={generateCSV}>
    //     Export logs
    //   </Button>

    //   <Button variant="contained" component="label">
    //     Import logs
    //     <input hidden type="file" onChange={readUploadFile} />
    //   </Button>
    // </Stack>
  );
};

export default Settings;
