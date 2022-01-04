type RelativeTimeFormatOptionsType =
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "month"
  | "year";

declare namespace RelativeTimeFormat {
  export interface RelativeTimeFormatOptions {
    style?: "long" | "narrow" | "short";
  }
}

declare class RelativeTimeFormat {
  static addLocale: (language: any) => void;

  constructor(
    language: string,
    options: RelativeTimeFormat.RelativeTimeFormatOptions
  );

  public format: (days: number, type: RelativeTimeFormatOptionsType) => string;
}

declare module "relative-time-format" {
  export default RelativeTimeFormat;
}
