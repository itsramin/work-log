import { Stack } from "@mui/material";
import FAB from "../components/FAB";
import TodaySummary from "../components/TodaySummary";
// import Weekly from "../components/weekly";
import WeekSummary from "../components/WeekSummary";

const WeeklyScreen = () => {
  return (
    <>
      <Stack direction="row" flexWrap="wrap" gap={3} alignItems="flex-start">
        <TodaySummary />
        <WeekSummary />
      </Stack>
      {/* <Weekly /> */}
      <FAB />
    </>
  );
};

export default WeeklyScreen;
