import './style.css'
import type { Event } from "./types/events";
import { BrowserAudio } from './processing/browser-audio.ts';
import { EventBuilder } from './processing/event-builder.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Cadence Test</h1>
    <div class="card">
      <button id="cadence" type="button">Test Cadence</button>
    </div>
  </div>
`

document.querySelector<HTMLButtonElement>('#cadence')?.addEventListener('click', () => {
  const events: Event[] = EventBuilder.orchestrateCadence("D", 31);
  BrowserAudio.play(events);
});
