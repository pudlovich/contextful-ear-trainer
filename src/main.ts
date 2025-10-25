import './style.css'
import type { Event } from "./types/events";
import { BrowserAudio } from './processing/browser-audio.ts';
import { EventBuilder } from './processing/event-builder.ts';
import { KeySelector } from './ui/key-selector.ts';
import { EdoSelector } from './ui/edo-selector.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Cadence Test</h1>
    <div class="card">
      <h2>Select Key</h2>
      <div id="key-selector"></div>
    </div>
    <div class="card">
      <h2>Select EDO</h2>
      <div id="edo-selector"></div>
    </div>
    <div class="card">
      <h2>Play</h2>
      <button id="cadence" type="button">Test Cadence</button>
    </div>
  </div>
`

const keySelector = new KeySelector();
const edoSelector = new EdoSelector();

document.querySelector<HTMLButtonElement>('#cadence')?.addEventListener('click', () => {
  const events: Event[] = EventBuilder.orchestrateCadence(keySelector.getSelected(), edoSelector.getSelected());
  BrowserAudio.play(events);
});
