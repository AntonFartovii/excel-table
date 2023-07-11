import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@/core/dom.js'; 
import {resizeHandler} from '@/components/table/table.resize';
import {shouldResize, isCell, matrix} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import * as actions from '@/redux/actions';
import {nextSelector} from './table.functions';
import {defaultStyles} from '../../constants';
import {parse} from '../../core/parse';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }
  toHTML() {
    return createTable(20, this.store.getState());
  }
  prepare() {
    // класс для хранения выбранных ячеек
    this.selection = new TableSelection();
  }

  init() {
    super.init ();
    // выбранная ячейка по дефолту
    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', value => {
      this.selection.current
        .attr('data-value', value)
        .text(parse(value));
      this.updateTextInStore(value);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', value =>{
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyles( {
        value,
        ids: this.selection.selectedIds,
      }
      ));
    });

    // this.$subscribe(state => {
    //   console.log ('TableState', state)
    // })
  }

  selectCell ($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    // console.log ('Styles', styles)

    this.$dispatch(actions.changeStyles(styles));
    // console.log ($cell.getStyles(['fontWeight', 'fontStyle', 'textAlign']))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn ('Resize error', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const target = $target.id(true);
        const current = this.selection.current.id(true);
        const $cells = matrix(target, current)
          .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'];
    const {key} = event;
    if (keys.includes(key) && !event.shiftKey){
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText( {
      id: this.selection.current.id(),
      value,
    }));
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }
}