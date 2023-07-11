import {toInlineStyles} from '@core/utils';
import {defaultStyles} from '../../constants';
import {parse} from '../../core/parse';

const CODES = {
  A: 65,
  Z: 90,
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'; 
}

function toCell(state, row) {
  return function (_, col) {
    const width = getWidth(state.colState, col);
    const id = `${row}:${col}`;
    const data = state.dataState[id];
    const styles = toInlineStyles( {
      ...defaultStyles,
      ...state.stylesState[id],
    }) + ';';
    return `<div 
              class="cell" 
              contenteditable 
              data-col="${col}"
              data-type="cell"
              data-value="${data || ''}"
              data-id="${row}:${col}"
              style="${styles} width: ${width};"
            >
              ${parse(data) || ''}
            </div>`;
  };
}
function toColumn({col, index, width}) {
  return `
    <div 
      class="column" 
      data-type="resizable" 
      data-col="${index}" 
      style="width: ${width}"> 
        ${col}
      <div class="col-resize" data-resizeid="${col}" data-resize="col">
      </div>
    </div>`;
}
function createRow(index, content, state) {
  const height = getHeight(state, index);
  return `
    <div 
    class="row" ${index ? 'data-type="resizable"' : ''} 
    data-row="${index}"
    style="height: ${height}">
      <div class="row-info" data-row="${index}">
        ${index ? index : ''}
        ${index ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>`;
}
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function widthFromState(state) {
  return function (col, index) {
    return {
      col, index, width: getWidth ( state.colState, index ),
    };
  };
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1; // Compute cols count
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(widthFromState(state))
    .map(toColumn)
    .join('');
  rows.push('<div class="google-line-ver" id="google-line-col">&nbsp;</div>');
  rows.push('<div class="google-line-hor" id="google-line-row">&nbsp;</div>');
  rows.push(createRow(null, cols, {}));
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
    // .map(toChar)
      .map(toCell(state, row))
      .join('');

    rows.push(createRow(row + 1, cells, state.rowState));
  }
  return rows.join('');
}
