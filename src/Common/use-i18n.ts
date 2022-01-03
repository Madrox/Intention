import * as moment from "moment";
import { DurationInputArg2 } from "moment";
import RelativeTimeFormat from "relative-time-format";
import en from "relative-time-format/locale/en.json";

RelativeTimeFormat.addLocale(en);

export const getDate = (
  date: Date,
  options?: Intl.DateTimeFormatOptions
): string => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", options);
  return dateFormatter.format(date);
};

const MONTH_DAYS = 365 / 12;

export const getRelativeDate = (
  date: Date,
  options: RelativeTimeFormat.RelativeTimeFormatOptions = {}
): string => {
  const currentDate = new Date();
  const diff = +currentDate - +date;
  const seconds = Math.round(diff / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = Math.round(days / MONTH_DAYS);
  const years = Math.round(months / 12);

  const relativeDateFormatter = new RelativeTimeFormat("en", options);

  if (Math.abs(seconds) < 60) {
    return relativeDateFormatter.format(seconds * -1, "second");
  }

  if (Math.abs(minutes) < 60) {
    return relativeDateFormatter.format(minutes * -1, "minute");
  }

  if (Math.abs(hours) < 24) {
    return relativeDateFormatter.format(hours * -1, "hour");
  }

  if (Math.abs(days) < MONTH_DAYS) {
    return relativeDateFormatter.format(days * -1, "day");
  }

  if (Math.abs(months) < 12) {
    return relativeDateFormatter.format(months * -1, "month");
  }

  return relativeDateFormatter.format(years * -1, "year");
};

export const getNumber = (number: number): string => {
  return number.toLocaleString();
};

const ORDINAL: Record<string, string> = {
  few: "rd",
  one: "st",
  other: "th",
  two: "nd",
};

export const getOrdinal = (number: number): string => {
  try {
    const formatter = new Intl.PluralRules("en-US", { type: "ordinal" });
    const value = `${number}${ORDINAL[formatter.select(number)]}`;
    return value;
  } catch (_) {
    return number.toString();
  }
};

export const getShortNumber = (number: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    compactDisplay: "short",
    notation: "compact",
  } as Intl.NumberFormatOptions);
  return formatter.format(number);
};

export const getDuration = (
  value: number,
  units: DurationInputArg2 = "seconds"
): string => {
  const duration = moment.default.duration(value, units);
  let format = "";
  if (duration.asSeconds() > 60 * 60) {
    format += duration.hours() + "h ";
  }
  if (duration.asSeconds() > 60) {
    format += duration.minutes() + "m ";
  }
  format += duration.seconds() + "s";
  return format;
};
