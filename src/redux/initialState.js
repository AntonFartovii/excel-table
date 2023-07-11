import {clone} from '@core/utils';
import {defaultStyles, defaultTitle} from '../constants';

export const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  title: defaultTitle,
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON(),
};

const normalize = state => ({ 
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}