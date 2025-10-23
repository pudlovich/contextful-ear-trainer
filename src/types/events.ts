export type Event = {
  frequencies: number[];
  msLength: number;
};

export type ScheduledPitchEvent = {
  id: number;
  frequency: number;
  startMoment: number;
  endMoment: number;
}
