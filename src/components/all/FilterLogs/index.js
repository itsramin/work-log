import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "zaman";
import { dataActions } from "../../../store/dataSlice";
import styles from "./index.module.css";

const FilterLogs = () => {
  const [filterDate1, setFilterDate1] = useState("");
  const [filterDate2, setFilterDate2] = useState("");
  const [filterDateFa1, setFilterDateFa1] = useState(false);
  const [filterDateFa2, setFilterDateFa2] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState("");
  const dispatch = useDispatch();
  const dataSlice = useSelector((state) => state.data);
  const uiSlice = useSelector((state) => state.ui);

  const resetHandler = useCallback(() => {
    setFilterDate1("");
    setFilterDate2("");
    setFilteredStatus("");
    setFilterDateFa1(false);
    setFilterDateFa2(false);
    dispatch(dataActions.clearDate1Filter());
    dispatch(dataActions.clearDate2Filter());
    dispatch(dataActions.clearStatusFilter());
  }, [dispatch]);

  useEffect(() => {
    resetHandler();
  }, [resetHandler]);

  const date1ChangeHandler = (e) => {
    setFilterDate1(e.target.value);
    dispatch(dataActions.setDate1Filter(e.target.value));
  };
  const date2ChangeHandler = (e) => {
    setFilterDate2(e.target.value);
    dispatch(dataActions.setDate2Filter(e.target.value));
  };
  const dateFa1ChangeHandler = (e) => {
    const value = e.value;
    dispatch(dataActions.setDate1Filter(value.toISOString().slice(0, 10)));
  };
  const dateFa2ChangeHandler = (e) => {
    const value = e.value;
    dispatch(dataActions.setDate2Filter(value.toISOString().slice(0, 10)));
  };

  const statusHandler = (e) => {
    setFilteredStatus(e.target.value);
    dispatch(dataActions.setStatusFilter(e.target.value));
  };

  const sortHandler = () => {
    if (dataSlice.sort === "Az") {
      dispatch(dataActions.setSort("Za"));
    } else {
      dispatch(dataActions.setSort("Az"));
    }
  };

  return (
    <div className={styles["filter-box"]}>
      <div className={styles["filter-row"]}>
        <div className={styles["filter-text"]}>Form</div>
        {uiSlice.language === "Fa" && (
          <>
            {filterDateFa1 && (
              <div className={styles["filter-datePicker"]}>
                <DatePicker onChange={dateFa1ChangeHandler} round="x2" />
              </div>
            )}
            {!filterDateFa1 && (
              <div
                className={styles["filter-noDate"]}
                onClick={() => setFilterDateFa1(true)}
              ></div>
            )}
          </>
        )}

        {uiSlice.language === "En" && (
          <input
            type="date"
            value={filterDate1}
            onChange={date1ChangeHandler}
            className={styles["filter-date"]}
          />
        )}
      </div>
      <div className={styles["filter-row"]}>
        <div className={styles["filter-text"]}>To</div>
        {uiSlice.language === "Fa" && (
          <>
            {filterDateFa2 && (
              <div className={styles["filter-datePicker"]}>
                <DatePicker onChange={dateFa2ChangeHandler} round="x2" />
              </div>
            )}
            {!filterDateFa2 && (
              <div
                className={styles["filter-noDate"]}
                onClick={() => setFilterDateFa2(true)}
              ></div>
            )}
          </>
        )}

        {uiSlice.language === "En" && (
          <input
            type="date"
            value={filterDate2}
            onChange={date2ChangeHandler}
            className={styles["filter-date"]}
          />
        )}
      </div>
      <div className={styles["filter-row"]}>
        <div className={styles["filter-text"]}>Status</div>
        <div className={styles["filter-status-box"]}>
          <label htmlFor="in" className={styles["filter-label"]}>
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
          <label htmlFor="out" className={styles["filter-label"]}>
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
          <label htmlFor="leave" className={styles["filter-label"]}>
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
      <div className={styles["filter-row"]}>
        <div onClick={sortHandler} className={styles["filter-btn"]}>
          {dataSlice.sort}
        </div>
        <div onClick={resetHandler} className={styles["filter-btn"]}>
          Reset
        </div>
      </div>
    </div>
  );
};

export default FilterLogs;
