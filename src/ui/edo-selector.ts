export class EdoSelector {
  rootElement = document.getElementById('edo-selector');
  availableTunings: number[] = [12,19,31,50,55];
  selectedValue: number = 12;

  constructor() {
    this.setUpButtons();
    this.select(31);
  }

  getSelected() {
    return this.selectedValue;
  }

  select(value: number) {
    this.selectedValue = value;
    this.unselectButtons();
    this.selectButton(value.toString());
  }

  setUpButtons() {
    const parentElement = this.rootElement;
    if(parentElement) {
      this.availableTunings.forEach((tuning) => {
        const button = document.createElement('button');
        button.textContent = tuning.toString();
        button.id = tuning.toString();;
        button.className = 'tuning-button';
        parentElement.appendChild(button);
        button.addEventListener('click', () => this.select(tuning));
      });
    }
  }

  unselectButtons() {
    document.querySelectorAll('.tuning-button').forEach(b => b.classList.remove('active'));
  }
  selectButton(id: string) {
    const btn = document.getElementById(id);
    if(btn) {
      btn.classList.add('active');
    }
  }
}