import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@/core/dom.js'
import {resizeHandler} from "@/components/table/table.resize";
import {shouldResize, isCell} from "@/components/table/table.functions";
import {matrix} from "@/components/table/table.functions";
import {TableSelection} from "@/components/table/TableSelection"

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }
  toHTML() {
    return createTable(20)
  }
  prepare() {
    // класс для хранения выбранных ячеек
    this.selection = new TableSelection()
  }

  init() {
    super.init ();
    // выбранная ячейка по дефолту
    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('Formula:input', text => {
      this.selection.current.text(text)
    })

    this.$on('Formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell ($cell) {
    this.selection.select($cell)
    this.$emit('Table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    } else if (isCell(event)) {
      const $target = $(event.target)
      this.selectCell($target)
      if (event.shiftKey) {
        const target = $target.id(true)
        const current = this.selection.current.id(true)
        const $cells = matrix(target, current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select ($target)
      }
    }
  }
  onKeydown(event) {
    this.selection.clear()
    const keys = [
        'Enter',
        'Tab',
        'ArrowLeft',
        'ArrowRight',
        'ArrowDown',
        'ArrowUp']
    const {key} = event
    if (keys.includes(key) && !event.shiftKey){
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }
  onInput(event) {
    this.selectCell($(event.target))
  }
}

function nextSelector(key, {col, row}) {
  const MIN_VALUE = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown': row++; break
    case 'Tab':
    case 'ArrowLeft': col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1; break
    case 'ArrowRight': col++; break
    case 'ArrowUp': row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1; break
  }
  return `[data-id="${row}:${col}"]`
}