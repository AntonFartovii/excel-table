import {ExcelComponent} from '@core/ExcelComponent'
import {Emitter} from "@/core/Emitter";
import {$} from "../../core/dom";

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
  }

  storeChanged({currentText} ) {
    this.$formula.text( currentText )
    // console.log('Formula changes: ', changes)
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>`
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text() )
  }


  onClick() {
    console.log('Formula click!')
  }

  init() {
    super.init ();

    this.$formula = this.$root.find('#formula')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.text())
    })
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)){
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
