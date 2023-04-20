import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import WeeklyTab from "../../tabs/WeeklyTab";
import AllTab from "../../tabs/AllTab";
import SettingsTab from "../../tabs/SettingsTab";

import styles from "./TabsSection.module.css";

const TabsSection = () => {
  const [tabNum, setTabNum] = useState(0);

  const tabChangeHandler = (e, num) => {
    setTabNum(num);
  };
  return (
    <>
      <Tabs
        value={tabNum}
        onChange={tabChangeHandler}
        centered
        className={styles.tabs}
      >
        <Tab label="Weekly" value={0} />
        <Tab label="All" value={1} />
        <Tab label="Settings" value={2} />
      </Tabs>

      {tabNum === 0 && <WeeklyTab />}
      {tabNum === 1 && <AllTab />}
      {tabNum === 2 && <SettingsTab />}
    </>
  );
};

export default TabsSection;
