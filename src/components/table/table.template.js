const CODES = {
    A: 65,
    Z: 90
}
function toCell() {
    return `
    <div class="cell" contenteditable="true"></div>`
}
function toColumn(col) {
    return `<div class="column">${col}</div>`
}
function  createRow(index,content) {
    return `
    <div class="row">
        <div class="row-info">${index == null ? '' : index}</div>
        <div class="row-data">${content}</div>
    </div>`
}
function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}
function toCharCell(_, index) {
    return CODES.A + index
}
export  function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')
    console.log(cols)
    rows.push(createRow(null,cols))
    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCharCell)
            .map(toCell)
            .join('')
        rows.push(createRow(i + 1,cells))
    }
    return rows.join('')
    // return `<h1>Table</h1>`
}