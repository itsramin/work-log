import { useEffect, useState } from "react";
import "./App.css";
import Btn from "./components/Btn";
import DataForm from "./components/DataForm";
import DataItem from "./components/DataItem";

function App() {
  const localData = JSON.parse(window.localStorage.getItem("data"));
  const initData = localData ? localData : [];

  const [data, setData] = useState(initData);
  const [curId, setCurId] = useState(null);

  const btnHandler = (status) => {
    const now = new Date();

    const newData = {
      id: +now,
      date: now.toISOString().slice(0, 10),
      time: now.toTimeString().slice(0, 8),
      timeStamp: +now,
      status: status,
    };
    setData((prev) => [newData, ...prev]);
  };

  const deleteHandler = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };
  const editHandler = (id) => {
    setCurId(id);
  };
  const submitEditHandler = (id) => {};

  useEffect(() => {
    window.localStorage.setItem("data", JSON.stringify(data));
  }, [data]);
  return (
    <div className="App">
      <main>
        <div className="actions">
          <Btn title="ورود" onClick={btnHandler.bind(null, "in")} />
          <Btn title="خروج" onClick={btnHandler.bind(null, "out")} />
        </div>
        <div className="table">
          {curId && <DataForm id={curId} onClose={() => setCurId(null)} />}
          {data.map((item) => (
            <DataItem
              item={item}
              key={item.id}
              onDelete={deleteHandler}
              onEdit={editHandler}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
