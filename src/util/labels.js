import { colors } from "./colors";

export const LANG_ARR = [
  { name: "Fa", label: "Persian", faLabel: "فارسی" },
  { name: "En", label: "English", faLabel: "انگلیسی" },
];
export const LANG_OBJ = { Fa: "faLabel", En: "label" };
export const COMPONENT_OBJ = { Fa: "faComponent", En: "component" };

export const STATUS_ARR = [
  { name: "in", label: "In", faLabel: "ورود", bgColor: colors.green100 },
  { name: "out", label: "Out", faLabel: "خروج", bgColor: colors.red100 },
  {
    name: "leave",
    label: "Leave",
    faLabel: "مرخصی",
    bgColor: colors.yellow100,
  },
];

export const SUMMARY_HEADER_ARR = [
  { name: "in", label: "In", faLabel: "ورود" },
  { name: "out", label: "Out", faLabel: "خروج" },
  { name: "work", label: "Work", faLabel: "ساعت" },
];
export const SORT_ARR = [
  { name: "Za", label: "Descend", faLabel: "نزولی" },
  { name: "Az", label: "Ascend", faLabel: "صعودی" },
];

export const HEADER_ARR = [
  { name: "day", label: "Day", faLabel: "روز" },
  { name: "date", label: "Date", faLabel: "تاریخ" },
  { name: "time", label: "Time", faLabel: "ساعت" },
  { name: "status", label: "Status", faLabel: "وضعیت" },
];
export const SUMMARY_ARR = [
  { name: "today", label: "Today Summary", faLabel: "آمار امروز" },
  { name: "date", label: "Date", faLabel: "تاریخ" },
  { name: "time", label: "Time", faLabel: "ساعت" },
  { name: "status", label: "Status", faLabel: "وضعیت" },
];
