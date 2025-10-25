export class KeySelector {
  rootElement = document.getElementById('key-selector');
  whiteKeys: string[] = ["C", "D", "E", "F", "G", "A", "B"];
  sharps: string[] = ["C#", "D#", "F#", "G#", "A#"];
  flats: string[] = ["Db", "Eb", "Gb", "Ab", "Bb"];
  selectedValue: string = "C";

  constructor() {
    this.setUpButtons();
    this.select("C");
  }

  getSelected() {
    return this.selectedValue;
  }

  select(value: string) {
    this.selectedValue = value;
    this.unselectButtons();
    this.selectButton(value);
  }

  setUpButtons() {
    const parentElement = this.rootElement;
    if(parentElement) {
      this.setUpButtonRow(this.sharps, "sharps", parentElement);
      this.setUpButtonRow(this.whiteKeys, "whitekeys", parentElement);
      this.setUpButtonRow(this.flats, "flats", parentElement);
    }
  }

  setUpButtonRow(keyNames: string[], className: string, parentElement: HTMLElement) {
    const rowDiv = document.createElement('div');
    rowDiv.className = className;
    parentElement.appendChild(rowDiv);
    keyNames.forEach((keyName) => {
      const button = document.createElement('button');
      button.textContent = keyName;
      button.id = keyName;
      button.className = 'key-button';
      rowDiv.appendChild(button);
      button.addEventListener('click', () => this.select(keyName));
    });
  }
  
  unselectButtons() {
    document.querySelectorAll('.key-button').forEach(b => b.classList.remove('active'));
  }
  selectButton(id: string) {
    const btn = document.getElementById(id);
    if(btn) {
      btn.classList.add('active');
    }
  }
}