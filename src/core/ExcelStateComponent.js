import {ExcelComponent} from './ExcelComponent';
import {createToolbar} from '../components/toolbar/toolbar.template';

export class ExcelStateComponent extends ExcelComponent{
  constructor(...args) {
    super(...args); 
  }

  prepare() {
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      textDecoration: 'none',
      fontStyle: 'normal',
    };
    this.initState(initialState);
  }

  get template() {
    return createToolbar(this.state);
  }
  initState(initialState = {}) {
    this.state = {...initialState};
  }

  setState(newState) {
    this.state = {...this.state, ...newState};
    this.$root.html(this.template);
  }
}