const CODES = {
  A: 65,
  Z: 90
}

function toCell(_, col) {
  return `
    <div  
        class="cell" 
        contenteditable 
        id="${col}" 
        data-coll="${col}" 
        data-resizeid="${col}">
        ${col}
    </div>
  `
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-coll="${index}"> 
      ${col}
      <div class="col-resize" data-resizeid="${col}" data-resize="col">
      </div>
    </div>`
}

function createRow(index, content) {
  return `
    <div class="row" ${index ? `data-type="resizable"` : ''}>
      <div class="row-info">
        ${index ? index : ''}
        ${index ? `<div class="row-resize" data-resize="row"></div>` : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>`
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1 // Compute cols count
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push('<div class="google-line-ver" id="google-line-col">&nbsp;</div>')
  rows.push('<div class="google-line-hor" id="google-line-row">&nbsp;</div>')
  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toCell)
        .join('')

    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
