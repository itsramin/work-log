import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../../store/dataSlice";
import Modal from "../../Modal";
import { DatePicker } from "zaman";
import styles from "./index.module.css";
import { LANG_OBJ, STATUS_ARR } from "../../../util/labels";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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

  const labelClass = `${styles["form-label"]} ${
    uiSlice.language === "Fa" ? styles["form-label-fa"] : {}
  }`;

  return (
    <Modal>
      <form className={styles.form} onSubmit={submitHandler}>
        {uiSlice.language === "Fa" ? (
          <div className={styles["form-row"]}>
            <div className={styles["form-datePicker"]}>
              <DatePicker
                defaultValue={selectedDate}
                onChange={dateFaChangeHandler}
              />
            </div>
            <div className={styles["form-timePicker"]}>
              <input
                type="time"
                onChange={timeFaChangeHandler}
                value={selectedTime}
              />
            </div>
          </div>
        ) : (
          <input
            type="datetime-local"
            value={selectedDate}
            onChange={dateChangeHandler}
          />
        )}
        <div className={styles["form-status"]}>
          {STATUS_ARR.map((status, i) => (
            <label htmlFor={status.name} key={i} className={labelClass}>
              <input
                type="radio"
                value={status.name}
                id={status.name}
                name="status"
                checked={selectedStatus === status.name}
                onChange={statusHandler}
              />
              <span>{status[LANG_OBJ[uiSlice.language]]}</span>
            </label>
          ))}
        </div>

        <Stack spacing={2} direction="row">
          <Button variant="text" onClick={closeHandler}>
            Cancel
          </Button>
          <Button variant="contained" onClick={submitHandler}>
            Save
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default DataForm;
