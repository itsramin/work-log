import { useState } from "react";
import { useDispatch } from "react-redux";
import { dataActions } from "../store/dataSlice";

const FilterLogs = () => {
  const [filterDate, setFilterDate] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("");
  const dispatch = useDispatch();

  const dateChangeHandler = (e) => {
    setFilterDate(e.target.value);
    dispatch(dataActions.setDateFilter(e.target.value));
  };
  const statusHandler = (e) => {
    setFilteredStatus(e.target.value);
    dispatch(dataActions.setStatusFilter(e.target.value));
  };
  const resetHandler = () => {
    setFilterDate("");
    setFilteredStatus("");
    dispatch(dataActions.clearDateFilter());
    dispatch(dataActions.clearStatusFilter());
  };

  return (
    <div className="filter-box">
      <input
        type="date"
        value={filterDate}
        onChange={dateChangeHandler}
        className="filter-date"
      />
      <div className="filter-status-box">
        <label htmlFor="in" className="filter-label">
          <input
            type="radio"
            value="in"
            id="in"
            name="status"
            checked={filteredStatus === "in"}
            onChange={statusHandler}
          />
          <span>in</span>
        </label>
        <label htmlFor="out" className="filter-label">
          <input
            type="radio"
            value="out"
            id="out"
            name="status"
            checked={filteredStatus === "out"}
            onChange={statusHandler}
          />
          <span>out</span>
        </label>
      </div>
      <div onClick={resetHandler} className="filter-reset-btn">
        reset
      </div>
    </div>
  );
};

export default FilterLogs;
