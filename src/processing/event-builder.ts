import { Pitch, Interval, SPN, TuningMap } from "meantonal";
import { Compound } from "./compound";
import type { Event } from "../types/events";
import type { ChordShape, Chord } from "../types/harmony";

export class EventBuilder {
  static orchestrateCadence(keyLetter: string, edo: number): Event[] {
    const basePitch: Pitch = this.mapLetterToBasePitch(keyLetter, edo);
    const chordShapes: ChordShape[] = this.getCadenceChordShapes();
    const chordSequence: Chord[] = chordShapes.map((shape) => {
      return this.buildChordFromShape(basePitch, shape);
    });
    return chordSequence.map((chord) => {
      return this.buildEventFromChord(chord, edo, 1000);
    });
  }

  static mapLetterToBasePitch(keyLetter: string, edo: number): Pitch {
    let pitch: Pitch = SPN.toPitch(`${keyLetter}3`);
    const octaveCutoff: Pitch = SPN.toPitch('D3');
    if(pitch == Pitch.highest([pitch, octaveCutoff], TuningMap.fromEDO(edo))) {
      pitch = pitch.transposeReal(new Interval(-5, -2))
    }
    return pitch;
  }

  static getCadenceChordShapes(): ChordShape[] {
    const majorCadence: ChordShape[] = [
      [Compound.from('P1', 0), Compound.from('M3', 1), Compound.from('P5', 1), Compound.from('P1', 2)],
      [Compound.from('P4', 0), Compound.from('P4', 1), Compound.from('M6', 1), Compound.from('P1', 2)],
      [Compound.from('P5', 0), Compound.from('M2', 1), Compound.from('P5', 1), Compound.from('M7', 1)],
      [Compound.from('P1', 0), Compound.from('M3', 1), Compound.from('P5', 1), Compound.from('P1', 2)]
    ];
    return majorCadence;
  } 

  static buildChordFromShape(basePitch: Pitch, chordShape: ChordShape): Chord {
    return chordShape.map((interval) => {
      return basePitch.transposeReal(interval);
    });
  }

  static buildEventFromChord(chord: Pitch[], edo: number, msLength: number): Event {
    const T = TuningMap.fromEDO(edo);
    const frequencies = chord.map((p) => T.toHz(p));
    return {frequencies: frequencies, msLength: msLength};
  }
}
