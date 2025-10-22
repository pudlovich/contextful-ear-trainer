import type { Event, ScheduledPitchEvent } from "../types/events";

export class BrowserAudio {
  static play(events: Event[]): void {
    const audioCtx: AudioContext = new window.AudioContext();
    const scheduledPitchEvents: ScheduledPitchEvent[] = this.explodeEvents(events);
    const oscMap: Map<number, OscillatorNode> = this.createOscillators(scheduledPitchEvents, audioCtx)
    this.playEvents(scheduledPitchEvents, oscMap, audioCtx);
  }

  static explodeEvents(events: Event[]): ScheduledPitchEvent[] {
    const scheduledPitchEvents: ScheduledPitchEvent[] = [];
    let offset = 0;
    events.forEach((event, i) => {
      event.frequencies.forEach((frequency, j) => {
        scheduledPitchEvents.push({
          id: 1000 * i + j,
          frequency: frequency,
          startMoment: offset/1000,
          endMoment: (offset + event.msLength)/1000
        });
      })
      offset += event.msLength;
    });
    return scheduledPitchEvents;
  }

  static createOscillators(scheduledPitchEvents: ScheduledPitchEvent[], audioCtx: AudioContext) {
    const oscMap: Map<number, OscillatorNode> = new Map();
    
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = 0.3;
    gainNode.connect(audioCtx.destination);

    scheduledPitchEvents.forEach((ev) => {
      const osc = audioCtx.createOscillator()
      osc.frequency.value = ev.frequency;
      osc.type = "triangle";
      osc.connect(gainNode);
      oscMap.set(ev.id, osc);
    });
    return oscMap;
  }

  static playEvents(scheduledPitchEvents: ScheduledPitchEvent[], oscMap: Map<number, OscillatorNode>, audioCtx: AudioContext) {
    let startPoint = audioCtx.currentTime + 1;
    scheduledPitchEvents.forEach((ev) => {
      const assignedOsc = oscMap.get(ev.id);
      if(assignedOsc) {
        assignedOsc.start(startPoint + ev.startMoment);
        assignedOsc.stop(startPoint + ev.endMoment);
      }
    });
  }
}
