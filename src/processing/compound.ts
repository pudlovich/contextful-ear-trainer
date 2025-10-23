import { Interval } from "meantonal";

export class Compound {
  static from(name: string, octave: number): Interval {
    return Interval.fromName(name).add(new Interval(5*octave, 2*octave));
  }
}
