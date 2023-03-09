import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Btn from "./components/Btn";
import DataForm from "./components/DataForm";
import DeleteModal from "./components/DeleteModal";
import LogList from "./components/LogList";
import Weekly from "./components/Weekly";

function App() {
  const dataSlice = useSelector((state) => state.data);

  const [tabNum, setTabNum] = useState(0);

  const tabChangeHandler = (num) => {
    setTabNum(num);
  };

  return (
    <div className="App">
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
        </div>

        {tabNum === 0 && <Weekly />}
        {tabNum === 1 && <LogList />}
      </main>
    </div>
  );
}

export default App;
