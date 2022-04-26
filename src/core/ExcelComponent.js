import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []
    // this.storeSub = null

    this.prepare()
  }

  // Настраивааем наш компонент до init
  prepare() {
  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }
  // Сюда приходя ттолько изменения по тем
  // полям на которые подписались
  storeChanged() {

  }

  isWatching (key) {
    return this.subscribe.includes(key)
  }

  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn)
  // }
  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDOMListeners()
  }
  // Удаляем компонент
  // Чистим слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsup => unsup())
    // this.storeSub.unsubscribe()
  }
}
