import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Btn from "./components/Btn";
import DataForm from "./components/DataForm";
import DeleteModal from "./components/DeleteModal";
import FilterLogs from "./components/FilterLogs";
import LogList from "./components/LogList";

function App() {
  const dataSlice = useSelector((state) => state.data);
  const [showFilter, setShowFilter] = useState(false);
  const filterHandler = () => {
    setShowFilter((prev) => !prev);
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

        <div className="options">
          <span className="filter-btn" onClick={filterHandler}>
            Filter
          </span>
        </div>

        {showFilter && <FilterLogs />}
        <LogList />
      </main>
    </div>
  );
}

export default App;
