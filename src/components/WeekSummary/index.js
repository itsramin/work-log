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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  convert2Time,
  convert2Date,
  calcWorkTime,
  calcWorkTimeArr,
} from "../../util/helper";
import { LANG_OBJ, SUMMARY_ARR, WEEK_HEADER_ARR } from "../../util/labels";

const WeekSummary = () => {
  const dataSlice = useSelector((state) => state.data);
  const { language, langOption } = useSelector((state) => state.ui);

  function getCurrWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek - 1);
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - dayOfWeek - 1));

    const dates = [];
    for (
      let date = startOfWeek;
      date <= endOfWeek;
      date.setDate(date.getDate() + 1)
    ) {
      let targetDate = new Date(date).toLocaleDateString(
        {},
        {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }
      );

      dates.push({
        date: convert2Date(new Date(date), langOption),
        weekday: new Intl.DateTimeFormat(langOption, {
          weekday: "short",
        }).format(new Date(date)),
        timeStamp: +new Date(targetDate),
      });
    }
    return dates;
  }

  const [weekArr, setWeekArr] = useState(getCurrWeek());
  const [sumWork, setSumWork] = useState(0);
  const weekLogs = dataSlice.list.filter(
    (log) => log.timeStamp > weekArr[0].timeStamp
  );

  useEffect(() => {
    const newArr = [...weekArr];

    for (let i = 0; i < 7; i++) {
      let weekIns = weekLogs
        .filter(
          (log) =>
            log.status === "in" &&
            log.timeStamp > newArr[i].timeStamp &&
            log.timeStamp < newArr[i].timeStamp + 24 * 60 * 60 * 1000
        )
        .reverse();

      let weekOuts = weekLogs
        .filter(
          (log) =>
            log.status === "out" &&
            log.timeStamp > newArr[i].timeStamp &&
            log.timeStamp < newArr[i].timeStamp + 24 * 60 * 60 * 1000
        )
        .reverse();
      let rows = [];
      weekIns.forEach((log, i) => {
        rows[i] = {
          ...rows[i],
          inStamp: log.timeStamp,
          in: convert2Time(log.timeStamp, langOption),
        };
      });
      weekOuts.forEach((log, i) => {
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
      let work = calcWorkTimeArr(rows);

      newArr[i].work = work;
    }

    setWeekArr(newArr);
    setSumWork(calcWorkTimeArr(newArr));
  }, [weekArr, weekLogs, langOption]);

  // styles

  const fa_text = { fontFamily: "VazirMatn" };
  const date_text = { color: "#c4c4c4", fontFamily: "VazirMatn" };

  return (
    <Paper elevation={2} sx={{ maxWidth: 300 }}>
      <Box padding={2}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography sx={fa_text}>
                {SUMMARY_ARR[1][LANG_OBJ[language]]}
              </Typography>
              <Typography variant="subtitle2" sx={date_text}>
                this week
              </Typography>
            </Stack>
          </Stack>
          <TableContainer>
            <Table
              aria-label="today table"
              size="small"
              sx={{ maxWidth: 250, marginX: "auto" }}
            >
              <TableHead>
                <TableRow>
                  {WEEK_HEADER_ARR.map((item, i) => (
                    <TableCell key={i} sx={fa_text}>
                      {item[LANG_OBJ[language]]}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {weekArr.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={fa_text}>{row.weekday}</TableCell>
                    <TableCell sx={fa_text}>{row.date}</TableCell>
                    <TableCell
                      sx={fa_text}
                      className={language === "Fa" && "fa-number"}
                    >
                      {row.work}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow />
                {weekArr.length > 1 && (
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
                      {sumWork}
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

export default WeekSummary;
