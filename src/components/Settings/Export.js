import { useSelector } from "react-redux";

import * as XLSX from "xlsx/xlsx.mjs";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { convert2Date, convert2Time } from "../../util/helper";

const Export = () => {
  const dataSlice = useSelector((state) => state.data);

  const exportFile = () => {
    const exportedArr = dataSlice.list.map((item) => {
      return {
        date: convert2Date(item.timeStamp),
        time: convert2Time(item.timeStamp),
        status: item.status,
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(exportedArr);
    const workbook = XLSX.utils.book_new();
    const fileName = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());

    XLSX.utils.book_append_sheet(workbook, worksheet, "logs");
    XLSX.writeFile(workbook, `${fileName}.xlsx`, { compression: true });
  };
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={exportFile}>
        <ListItemIcon>
          <FileDownloadIcon />
        </ListItemIcon>
        <ListItemText
          primary="Export logs"
          secondary="Export logs to .xlsx file"
        />
      </ListItemButton>
    </ListItem>
  );
};

export default Export;
