import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@/core/dom.js'
import {resizeHandler} from "./table.resize";
import {shouldResize} from "./table.functions";

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
      // listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
    })
  }
  toHTML() {
    return createTable(20)
  }

  // onClick() {
  //   console.log('click')
  // }
  //
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    }
  }
  //
  // onMousemove() {
  //   console.log('mousemove')
  // }
  //
  // onMouseup() {
  //   console.log('mouseup')
  // }
}
function startResize() {
  return ''
}
function stopResize() {
  return ''
}
