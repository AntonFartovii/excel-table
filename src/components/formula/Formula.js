import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    });
  }

  toHTML() {
    return ` 
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false">
      </div>`;
  }

  onInput(event) {
    const text = event.target.textContent.trim();
    // add event
    this.$emit('formula:input', text);
  }

  init() {
    super.init();

    this.$formula = this.$root.find('#formula');

    // when we select table cell
    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value);
    });

    // when we write text in table cell
    this.$on('Table:input', $cell => {
      this.$formula.text($cell.text());
    });
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText);
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}
