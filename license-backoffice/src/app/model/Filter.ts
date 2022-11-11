export interface Filter {
  startDate: Date;
  endDate: Date;
  license: string;
  minSpeed: number;
  maxSpeed: number;
  province: string;
  color: string;
  place: string;
  startHour: string;
  endHour: string;
}
export interface ChannelFilter {
  startDate: Date;
  endDate: Date;
  channel: number;
}
