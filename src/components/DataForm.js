import { useEffect, useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";

const DataForm = ({ id, onClose }) => {
  const [value, setValue] = useState();
  const localData = JSON.parse(window.localStorage.getItem("data"));
  useEffect(() => {
    // setValue(localData);
    console.log(localData.find((item) => item.id === id));
    // setValue(new Date(localData.find((item) => item.id === id).timeStamp));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(value);
  };
  return (
    <form className="form" onSubmit={submitHandler}>
      <input type="datetime-local" value={value} />
      <div className="form-actions">
        <MdCheck />
        <MdClose onClick={onClose} />
      </div>
    </form>
  );
};

export default DataForm;
