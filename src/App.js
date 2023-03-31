import { useState } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import DataForm from "./components/DataForm";
import DeleteModal from "./components/DeleteModal";
import LogList from "./components/LogList";
import Weekly from "./components/Weekly";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Settings from "./components/Settings";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import FAB from "./components/FAB";

function App() {
  const dataSlice = useSelector((state) => state.data);

  const [tabNum, setTabNum] = useState(0);

  const tabChangeHandler = (e, num) => {
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
      {dataSlice.deleteIds && <DeleteModal />}
      <main>
        <Tabs
          value={tabNum}
          onChange={tabChangeHandler}
          centered
          className="tabs"
        >
          <Tab label="Weekly" value={0} />
          <Tab label="All" value={1} />
          <Tab label="Settings" value={2} />
        </Tabs>

        {tabNum === 0 && (
          <>
            <Weekly />
            <FAB />
          </>
        )}
        {tabNum === 1 && (
          <>
            <LogList />
            <FAB />
          </>
        )}
        {tabNum === 2 && <Settings />}
      </main>
    </div>
  );
}

export default App;
