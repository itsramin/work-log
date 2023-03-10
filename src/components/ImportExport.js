import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as XLSX from "xlsx/xlsx.mjs";
import { dataActions } from "../store/dataSlice";

const ImportExport = () => {
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
  return (
    <div>
      <div className="export" onClick={generateCSV}>
        export
      </div>
      <form>
        <label htmlFor="upload">Import</label>
        <input
          type="file"
          name="upload"
          id="upload"
          onChange={readUploadFile}
        />
      </form>
    </div>
  );
};

export default ImportExport;
