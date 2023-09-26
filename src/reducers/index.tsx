import {combineReducers} from 'redux';

import {ProductReducers} from './productReducer';

const appReducer = combineReducers({
  products: ProductReducers,
});

const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
