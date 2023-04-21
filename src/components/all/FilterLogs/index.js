import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "zaman";
import { dataActions } from "../../../store/dataSlice";
import styles from "./index.module.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import {
  COMPONENT_OBJ,
  LANG_OBJ,
  SORT_ARR,
  STATUS_ARR,
} from "../../../util/labels";

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

  const [sort, setSort] = useState(dataSlice.sort);

  const handleSortChange = (event, newSort) => {
    setSort(newSort);
    dispatch(dataActions.setSort(newSort));
  };
  const handleStatusChange = (event, newStatus) => {
    setFilteredStatus(newStatus);
    dispatch(dataActions.setStatusFilter(newStatus));
  };

  const faText = {
    fontFamily: "Vazirmatn",
    lineHeight: 1,
  };
  const rowClass = `${styles["filter-row"]} ${
    uiSlice.language === "Fa" && styles["filter-row-fa"]
  }`;
  const rowControlClass = `${styles["filter-control-row"]} ${
    uiSlice.language === "Fa" && styles["filter-row-fa"]
  }`;

  const dateArr = [
    {
      name: "from",
      label: "From",
      faLabel: "از",
      component: (
        <input
          type="date"
          value={filterDate1}
          onChange={date1ChangeHandler}
          className={styles["filter-date"]}
        />
      ),
      faComponent: (
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
      ),
    },
    {
      name: "to",
      label: "To",
      faLabel: "تا",
      component: (
        <input
          type="date"
          value={filterDate2}
          onChange={date2ChangeHandler}
          className={styles["filter-date"]}
        />
      ),
      faComponent: (
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
      ),
    },
  ];

  return (
    <div className={styles["filter-box"]}>
      <div className={rowClass}>
        {dateArr.map((item, i) => (
          <div key={i} className={rowControlClass}>
            <div className={styles["filter-text"]}>
              {item[LANG_OBJ[uiSlice.language]]}
            </div>
            {item[COMPONENT_OBJ[uiSlice.language]]}
          </div>
        ))}
      </div>
      <div className={rowClass}>
        <ToggleButtonGroup
          color="primary"
          value={filteredStatus}
          exclusive
          onChange={handleStatusChange}
          aria-label="Platform"
        >
          {STATUS_ARR.map((option, i) => (
            <ToggleButton value={option.name} key={i}>
              <Typography style={faText}>
                {option[LANG_OBJ[uiSlice.language]]}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <ToggleButtonGroup
          color="primary"
          value={sort}
          exclusive
          onChange={handleSortChange}
          aria-label="Platform"
        >
          {SORT_ARR.map((option, i) => (
            <ToggleButton value={option.name} key={i}>
              <Typography style={faText}>
                {option[LANG_OBJ[uiSlice.language]]}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button variant="outlined" onClick={resetHandler} size="large">
          <Typography style={uiSlice.language === "Fa" ? faText : {}}>
            {uiSlice.language === "Fa" ? "ریست" : "Reset"}
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default FilterLogs;
