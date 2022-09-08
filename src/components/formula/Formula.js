import {ExcelComponent} from '@core/ExcelComponent'
import {Emitter} from "@/core/Emitter";

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>`
  }

  onInput(event) {
    const text = event.target.textContent.trim();
    this.$emit('Formula:input', text)
  }

  onClick() {
    console.log('Formula click!')
  }

  init() {
    super.init ();
    this.$formula = this.$root.find('#formula')
    this.$on('Table:select', $cell => {
      this.$formula.text($cell.text())
    })
    this.$on('Table:input', $cell => {
      this.$formula.text($cell.text())
    })
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)){
      event.preventDefault()
      this.$emit('Formula:done')
    }
  }
}
