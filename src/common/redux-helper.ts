import produce from 'immer';
import { NOT_IMMUTABLE } from './constant';

export function createReducer(initialState: any, handlerMap: any) {
    return function (state = initialState, action: any) {
      const handler = handlerMap[action.type];
      if (handler) {
        if (action[NOT_IMMUTABLE]) {
          return handler(state, action);
        } else {
          return produce(state, (draft: any) => {
            const handler = handlerMap[action.type];
            handler(draft, action);
          });
        }
      } else {
        return state;
      }
    };
  }

  export function setValueReducer(state: any, action: any) {
    state[action.key] = action.value;
    return state;
}