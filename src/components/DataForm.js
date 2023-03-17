import { useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../store/dataSlice";
import Modal from "./Modal";

const DataForm = () => {
  const dataSlice = useSelector((state) => state.data);
  const target = dataSlice.list.find((item) => item.id === dataSlice.editId);

  const [selectedDate, setSelectedDate] = useState(
    new Date(target.timeStamp - new Date().getTimezoneOffset() * 60 * 1000)
      .toISOString()
      .slice(0, 16)
  );
  const [selectedStatus, setSelectedStatus] = useState(target.status);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const dateWithSec = selectedDate + ":00";

    const editData = {
      id: target.id,
      timeStamp: +new Date(dateWithSec),
      status: selectedStatus,
    };

    dispatch(dataActions.edit(editData));
  };
  const dateChangeHandler = (event) => {
    setSelectedDate(event.target.value);
  };
  const statusHandler = (e) => {
    setSelectedStatus(e.target.value);
  };
  const closeHandler = () => {
    dispatch(dataActions.clearEditId());
  };
  return (
    <Modal>
      <form className="form" onSubmit={submitHandler}>
        <input
          type="datetime-local"
          value={selectedDate}
          onChange={dateChangeHandler}
        />
        <div className="form-status">
          <label htmlFor="in" className="form-label">
            <input
              type="radio"
              value="in"
              id="in"
              name="status"
              checked={selectedStatus === "in"}
              onChange={statusHandler}
            />
            <span>in</span>
          </label>
          <label htmlFor="out" className="form-label">
            <input
              type="radio"
              value="out"
              id="out"
              name="status"
              checked={selectedStatus === "out"}
              onChange={statusHandler}
            />
            <span>out</span>
          </label>
        </div>

        <div className="form-actions">
          <div className="form-cancel-icon" onClick={closeHandler}>
            <MdClose />
          </div>
          <div className="form-check-icon" onClick={submitHandler}>
            <MdCheck />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default DataForm;
