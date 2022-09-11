import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.store = options.store
    this.unsubscribers = []
    this.subscribe = options.subscribe || []
    // this.storeSub = null

    this.prepare()
  }


  prepare() {
  }

  // Инициализируем компонент
  // Добавляем DOM слушателей
  init() {
    this.initDOMListeners()
  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  $dispatch( action ) {
    this.store.dispatch( action )
  }

  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn)
  // }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  // Подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  // Сюда приходят ихенения по тем полям на которые подписались
  storeChanged() {

  }

  isWatching( key ) {
    return this.subscribe.includes( key )
  }
  // Удаляем компонент
  // Чистим слушателей
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsup => unsup())
    // this.storeSub.unsubscribe()
  }
}
