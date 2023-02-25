import { useSelector } from "react-redux";
import "./App.css";
import Btn from "./components/Btn";
import DataForm from "./components/DataForm";
import DeleteModal from "./components/DeleteModal";
import LogList from "./components/LogList";

function App() {
  const dataSlice = useSelector((state) => state.data);

  return (
    <div className="App">
      <main>
        <div className="actions">
          <Btn title="In" status="in" />
          <Btn title="Out" status="out" />
        </div>
        <div className="table">
          {dataSlice.editId && <DataForm />}
          {dataSlice.deleteId && <DeleteModal />}
          <LogList />
        </div>
      </main>
    </div>
  );
}

export default App;
