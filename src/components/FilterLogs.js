import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../store/dataSlice";

const FilterLogs = () => {
  const [filterDate1, setFilterDate1] = useState("");
  const [filterDate2, setFilterDate2] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("");
  const dispatch = useDispatch();
  const dataSlice = useSelector((state) => state.data);
  useEffect(() => {
    resetHandler();
  }, []);

  const date1ChangeHandler = (e) => {
    setFilterDate1(e.target.value);
    dispatch(dataActions.setDate1Filter(e.target.value));
  };
  const date2ChangeHandler = (e) => {
    setFilterDate2(e.target.value);
    dispatch(dataActions.setDate2Filter(e.target.value));
  };
  const statusHandler = (e) => {
    setFilteredStatus(e.target.value);
    dispatch(dataActions.setStatusFilter(e.target.value));
  };
  const resetHandler = () => {
    setFilterDate1("");
    setFilterDate2("");
    setFilteredStatus("");
    dispatch(dataActions.clearDate1Filter());
    dispatch(dataActions.clearDate2Filter());
    dispatch(dataActions.clearStatusFilter());
  };
  const sortHandler = () => {
    if (dataSlice.sort === "Az") {
      dispatch(dataActions.setSort("Za"));
    } else {
      dispatch(dataActions.setSort("Az"));
    }
  };

  return (
    <div className="filter-box">
      <div className="filter-row">
        <div className="filter-text">Form</div>
        <input
          type="date"
          value={filterDate1}
          onChange={date1ChangeHandler}
          className="filter-date"
        />
      </div>
      <div className="filter-row">
        <div className="filter-text">To</div>
        <input
          type="date"
          value={filterDate2}
          onChange={date2ChangeHandler}
          className="filter-date"
        />
      </div>
      <div className="filter-row">
        <div className="filter-text">Status</div>
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
          <label htmlFor="leave" className="filter-label">
            <input
              type="radio"
              value="leave"
              id="leave"
              name="status"
              checked={filteredStatus === "leave"}
              onChange={statusHandler}
            />
            <span>leave</span>
          </label>
        </div>
      </div>
      <div className="filter-row">
        <div onClick={sortHandler} className="filter-btn">
          {dataSlice.sort}
        </div>
        <div onClick={resetHandler} className="filter-btn">
          Reset
        </div>
      </div>
    </div>
  );
};

export default FilterLogs;
