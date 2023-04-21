import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as XLSX from "xlsx/xlsx.mjs";
import { dataActions } from "../../store/dataSlice";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import FileUploadIcon from "@mui/icons-material/FileUpload";

const Import = () => {
  const dispatch = useDispatch();

  const importFile = (e) => {
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
          json[0].hasOwnProperty("time") &&
          json[0].hasOwnProperty("status") &&
          json.length > 0
        ) {
          const dataArr = json.map((row, i) => {
            const formattedTime =
              row.time.length > 5 ? row.time : row.time + ":00";
            const hourToSec = +formattedTime.split(":")[0] * 60 * 60;
            const minToSec = +formattedTime.split(":")[1] * 60;
            const sec = +formattedTime.split(":")[2];
            // const offsetToSec = new Date().getTimezoneOffset() * 60;
            const timeStamp =
              +new Date(row.date) + (hourToSec + minToSec + sec) * 1000;
            return {
              id: `${+new Date()}-${i}`,
              status: row.status,
              timeStamp,
            };
          });

          toast.success("Import successfully!");
          dispatch(dataActions.import(dataArr));
        } else {
          toast.error("File is incorrect!");
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
      e.target.value = null;
    }
  };
  return (
    <ListItem disablePadding>
      <ListItemButton component="label">
        <ListItemIcon>
          <FileUploadIcon />
        </ListItemIcon>
        <ListItemText
          primary="Import logs"
          secondary="Import logs from .xlsx file"
        />
        <input hidden type="file" onChange={importFile} />
      </ListItemButton>
    </ListItem>
  );
};

export default Import;
