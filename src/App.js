import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Btn from "./components/Btn";
import DataForm from "./components/DataForm";
import DeleteModal from "./components/DeleteModal";
import LogList from "./components/LogList";
import Weekly from "./components/Weekly";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImportExport from "./components/ImportExport";

function App() {
  const dataSlice = useSelector((state) => state.data);

  const [tabNum, setTabNum] = useState(0);

  const tabChangeHandler = (num) => {
    setTabNum(num);
  };

  return (
    <div className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {dataSlice.editId && <DataForm />}
      {dataSlice.deleteId && <DeleteModal />}
      <main>
        <div className="actions">
          <Btn title="In" status="in" />
          <Btn title="Out" status="out" />
        </div>

        <div className="tabs">
          <div
            className={tabNum === 0 ? "tab tab-selected" : "tab"}
            onClick={tabChangeHandler.bind(null, 0)}
          >
            Weekly
          </div>
          <div
            className={tabNum === 1 ? "tab tab-selected" : "tab"}
            onClick={tabChangeHandler.bind(null, 1)}
          >
            All
          </div>
          <div
            className={tabNum === 2 ? "tab tab-selected" : "tab"}
            onClick={tabChangeHandler.bind(null, 2)}
          >
            Settings
          </div>
        </div>

        {tabNum === 0 && <Weekly />}
        {tabNum === 1 && <LogList />}
        {tabNum === 2 && <ImportExport />}
      </main>
    </div>
  );
}

export default App;
