import {ExcelComponent} from '@core/ExcelComponent';
import * as actions from '@/redux/actions';
import {$} from '@core/dom';
import {defaultTitle} from '../../constants';
import {debounce} from '../../core/utils';
import {ActiveRoute} from '../../core/routes/ActiveRoute'; 

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super ($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }
  init() {
    super.init ();
  }

  prepare() {
    super.prepare ();
    this.onInput = debounce(this.onInput, 300);
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(actions.changeTitle($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.button === 'remove') {
      const decision = confirm('Вы уверены?');
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }

  toHTML() {
    const title = this.state = this.store.getState().title || defaultTitle;
    return `
      <input type="text" class="input" value="${title}" />
      <div>
        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>
        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
      </div>
    `;
  }
}
