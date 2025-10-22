import './style.css'
import type { Event } from "./types/events";
import { BrowserAudio } from './processing/browser-audio.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Cadence Test</h1>
    <div class="card">
      <button id="cadence" type="button">Test Cadence</button>
    </div>
  </div>
`

let events: Event[] = [
  { frequencies: [200, 300, 400],
    msLength: 1000 },
  { frequencies: [200, 320, 500],
    msLength: 1000 },
  { frequencies: [300, 400],
    msLength: 1000 }
];
document.querySelector<HTMLButtonElement>('#cadence')?.addEventListener('click', () => BrowserAudio.play(events));
