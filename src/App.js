import { useSelector } from "react-redux";
import "./App.css";
import DataForm from "./components/all/DataForm";
import DeleteModal from "./components/all/DeleteModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import TabsSection from "./components/TabsSection/TabsSection";

function App() {
  const dataSlice = useSelector((state) => state.data);

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
        <TabsSection />
      </main>
    </div>
  );
}

export default App;
