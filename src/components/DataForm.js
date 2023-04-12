import { useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../store/dataSlice";
import Modal from "./Modal";
import { DatePicker } from "zaman";

const DataForm = () => {
  const dataSlice = useSelector((state) => state.data);
  const uiSlice = useSelector((state) => state.ui);
  const target = dataSlice.list.find((item) => item.id === dataSlice.editId);

  const [selectedDate, setSelectedDate] = useState(
    new Date(target.timeStamp - new Date().getTimezoneOffset() * 60 * 1000)
      .toISOString()
      .slice(0, 16)
  );
  const [selectedTime, setSelectedTime] = useState(
    new Date(target.timeStamp - new Date().getTimezoneOffset() * 60 * 1000)
      .toISOString()
      .slice(11, 16)
  );

  const [selectedStatus, setSelectedStatus] = useState(target.status);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    let dateWithSec;
    if (uiSlice.language === "En") {
      dateWithSec = selectedDate + ":00";
    } else if (uiSlice.language === "Fa") {
      dateWithSec = selectedDate.slice(0, 10) + "T" + selectedTime + ":00";
    }

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
  const dateFaChangeHandler = (event) => {
    setSelectedDate(event.value);
  };
  const timeFaChangeHandler = (event) => {
    setSelectedTime(event.target.value);
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
        {uiSlice.language === "En" && (
          <input
            type="datetime-local"
            value={selectedDate}
            onChange={dateChangeHandler}
          />
        )}
        {uiSlice.language === "Fa" && (
          <div className="form-row">
            <div className="form-datePicker">
              <DatePicker
                defaultValue={selectedDate}
                onChange={dateFaChangeHandler}
              />
            </div>
            <div className="form-timePicker">
              <input
                type="time"
                onChange={timeFaChangeHandler}
                value={selectedTime}
              />
              {/* <TimePicker
                defaultValue={selectedTime}
                onChange={timeFaChangeHandler}
              /> */}
            </div>
          </div>
        )}
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
          <label htmlFor="leave" className="form-label">
            <input
              type="radio"
              value="leave"
              id="leave"
              name="status"
              checked={selectedStatus === "leave"}
              onChange={statusHandler}
            />
            <span>leave</span>
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
