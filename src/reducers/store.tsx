import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '.';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
