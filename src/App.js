import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import AppDrawer from "./AppDrawer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { dataActions } from "./store/dataSlice";

function App() {
  const { lastDate } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const today = new Date().toLocaleString(
    {},
    {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }
  );
  useEffect(() => {
    if (lastDate !== today) {
      dispatch(dataActions.setLastDate(today));
      dispatch(dataActions.setLastStatus(null));
    }
  }, []);
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
      <AppDrawer />
    </div>
  );
}

export default App;
