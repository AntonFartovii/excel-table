export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'});
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn); 
      return {
        unsubscribe() {
          listeners = listeners.filter(listener => listener !== fn);
        },
      };
    },
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach(listener => listener(state));
    },
    getState() {
      // return state
      // если нет сложной структуры данных
      return JSON.parse(JSON.stringify(state));
    },
  };
}
// Extra Task - Переписать на класс