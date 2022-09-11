const CODES = {
  A: 65,
  Z: 90
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function toCell( state, row ) {
  return function(_, col) {
    return `
      <div 
        class="cell" 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-id="${row}:${col}"
        style="width: ${getWidth( state.colState, col )}; 
        height: ${getHeight( state.rowState, row )}"
      ></div>
    `
  }
}

function toColumn({col, index, width} ) {
  return `
    <div class="column" data-type="resizable" 
         data-col="${index}" style="width: ${width}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow( index, content ) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizable" data-row="${index}">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function getWidth( state = {}, index ) {
    return ( state[index] || DEFAULT_WIDTH ) + 'px'
}

function getHeight( state = {}, index ) {
    return ( state[index] || DEFAULT_HEIGHT + 'px')
}

function withWidthFromState( state ) {
    return function ( col, index ) {
        return {
            col, index, width: getWidth( state.colState, index )
        }
    }
}

export function createTable(rowsCount = 15, state = {}) {
  console.log( state )
  const colsCount = CODES.Z - CODES.A + 1 // Compute cols count
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFromState( state ))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell( state, row ))
        .join('')

    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}