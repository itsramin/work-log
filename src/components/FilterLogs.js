import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../store/dataSlice";

const FilterLogs = () => {
  const [filterDate1, setFilterDate1] = useState("");
  const [filterDate2, setFilterDate2] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("");
  const dispatch = useDispatch();
  const dataSlice = useSelector((state) => state.data);

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
        <input
          type="date"
          value={filterDate1}
          onChange={date1ChangeHandler}
          className="filter-date"
        />
        <input
          type="date"
          value={filterDate2}
          onChange={date2ChangeHandler}
          className="filter-date"
        />
      </div>
      <div className="filter-row">
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
        <div className="filter-row">
          <div onClick={sortHandler} className="filter-btn">
            {dataSlice.sort}
          </div>
          <div onClick={resetHandler} className="filter-btn">
            reset
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterLogs;
