import dayjs, { Dayjs, OpUnitType } from "dayjs";
import {
  DMY,
  DMYHm,
  DMYHms,
  HHmm,
  YMD,
  YMDHm,
  YMDHms,
  ddmmyyyy,
} from "@/utils/config/constant";

export const convertDateYMD = (date: any) =>
  date ? dayjs(date).format(YMD) : null;
export const convertDateYMDHms = (date: any) =>
  date ? dayjs(date).format(YMDHms) : null;
export const convertDateYMDHm = (date: any) =>
  date ? dayjs(date).format(YMDHm) : null;

export const convertDateDMY = (date: any) =>
  date ? dayjs(date).format(ddmmyyyy) : undefined;
export const convertDateDMYHms = (date: any) =>
  date ? dayjs(date).format(DMYHms) : null;
export const convertDateDMYHm = (date: any) =>
  date ? dayjs(date).format(DMYHm) : undefined;
export const convertDateHHmm = (date: any) =>
  date ? dayjs(date).format(HHmm) : null;

export function convertToIsoString(date?: string | number | Date | Dayjs) {
  if (!date) return null;
  return dayjs(date).toISOString();
}

export function convertToIsoStringUTC(date?: string | number | Date | Dayjs) {
  if (!date) return null;
  return dayjs(date).utc(true).toISOString();
}

export function convertToMs(date?: string | number | Date | Dayjs) {
  if (!date) return null;
  return dayjs(date).toDate().getTime();
}

export function convertToS(date?: string | number | Date | Dayjs) {
  if (!date) return null;
  return dayjs(date).toDate().getTime() / 1000;
}

export function convertToTimestamp(date?: string | number | Date | Dayjs) {
  if (!date) return null;
  return dayjs(date).unix();
}

export function formatDateTimestamp(
  date?: string | number | Date | Dayjs,
  format?: string,
) {
  if (!date) return null;
  return dayjs(date).format(format || ddmmyyyy);
}

export function mergeDateAndTime(dateStr: string, timeStr: string) {
  const date = dayjs(dateStr);
  const [h, m] = timeStr.split(":");

  return date
    .set("hour", Number(h))
    .set("minute", Number(m))
    .set("second", 0)
    .set("millisecond", 0);
}
