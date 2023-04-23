import FAB from "../components/FAB";
import TodaySummary from "../components/TodaySummary";
import Weekly from "../components/weekly";

const WeeklyScreen = () => {
  return (
    <>
      <TodaySummary />
      <Weekly />
      <FAB />
    </>
  );
};

export default WeeklyScreen;
