import {storage} from '@core/utils';

export function toHtml(key = '11') {
  const model = storage(key);
  return `<a href="#excel/${key.split(':')[1]}">
          <li class="db__record">
          ${model.title}
          <strong>${new Date(model.openedDate).toLocaleDateString()}</strong>
          </li></a>`;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel')) {
      continue;
    }
    keys.push(key);
  }
  return keys;
}

export function getAllRecords() {
  return '<p>Вы пока не создали ни одной записи</p>';
}

export function createRecordsTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    getAllRecords();
  }
  return `<div class="db__list-header">
                <span>Название</span>
                <span>Дата открытия</span>
            </div>

            <ul class="db__list">
            ${keys.map(toHtml).join('')}
            </ul>`;
}