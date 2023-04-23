import {
  Box,
  Stack,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { convert2Time, calcWorkTime, calcWorkTimeArr } from "../../util/helper";
import {
  LANG_OBJ,
  STATUS_ARR,
  SUMMARY_ARR,
  SUMMARY_HEADER_ARR,
} from "../../util/labels";

const TodaySummary = () => {
  const dataSlice = useSelector((state) => state.data);
  const { language, langOption } = useSelector((state) => state.ui);

  const today = new Date().toLocaleString(
    {},
    {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }
  );

  const todayLabel = new Date().toLocaleString(langOption, {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  const todayLogs = dataSlice.list.filter(
    (log) => log.timeStamp > +new Date(today)
  );
  const todayIns = todayLogs.filter((log) => log.status === "in").reverse();
  const todayOuts = todayLogs.filter((log) => log.status === "out").reverse();
  let rows = [];

  todayIns.forEach((log, i) => {
    rows[i] = {
      ...rows[i],
      inStamp: log.timeStamp,
      in: convert2Time(log.timeStamp, langOption),
    };
  });
  todayOuts.forEach((log, i) => {
    rows[i] = {
      ...rows[i],
      outStamp: log.timeStamp,
      out: convert2Time(log.timeStamp, langOption),
    };
  });

  rows.forEach((log) => {
    if (log.in && log.out) {
      const workTime =
        Math.floor(log.outStamp / 1000 / 60) -
        Math.floor(log.inStamp / 1000 / 60);
      log.work = calcWorkTime(workTime);
    }
  });

  const last_status = STATUS_ARR.find(
    (stat) => stat.name === dataSlice.lastStatus
  );

  const last_exist_status = last_status
    ? last_status[LANG_OBJ[language]]
    : null;
  const today_sum_work = calcWorkTimeArr(rows);

  // styles

  const fa_text = { fontFamily: "VazirMatn" };
  const date_text = { color: "#c4c4c4", fontFamily: "VazirMatn" };
  const last_status_style = last_status && {
    backgroundColor: STATUS_ARR.find(
      (stat) => stat.name === dataSlice.lastStatus
    ).bgColor,
    alignSelf: "flex-start",
    padding: "2px 10px",
    borderRadius: "5px",
  };

  return (
    <Paper elevation={2} sx={{ maxWidth: 300 }}>
      <Box padding={2}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography sx={fa_text}>
                {SUMMARY_ARR[0][LANG_OBJ[language]]}
              </Typography>
              <Typography variant="subtitle2" sx={date_text}>
                {todayLabel}
              </Typography>
            </Stack>
            {last_status && (
              <Box sx={last_status_style}>
                <Typography sx={fa_text}>{last_exist_status}</Typography>
              </Box>
            )}
          </Stack>
          <TableContainer>
            <Table
              aria-label="today table"
              size="small"
              sx={{ maxWidth: 250, marginX: "auto" }}
            >
              <TableHead>
                <TableRow>
                  {SUMMARY_HEADER_ARR.map((item, i) => (
                    <TableCell key={i} sx={fa_text}>
                      {item[LANG_OBJ[language]]}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={fa_text}>{row.in}</TableCell>
                    <TableCell sx={fa_text}>{row.out}</TableCell>
                    <TableCell
                      sx={fa_text}
                      className={language === "Fa" && "fa-number"}
                    >
                      {row.work}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow />
                {rows.length > 1 && (
                  <TableRow>
                    <TableCell />
                    <TableCell variant="head" sx={fa_text}>
                      {language === "Fa" ? "جمع" : "Sum"}
                    </TableCell>
                    <TableCell
                      variant="head"
                      sx={fa_text}
                      className={language === "Fa" && "fa-number"}
                    >
                      {today_sum_work}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </Paper>
  );
};

export default TodaySummary;
