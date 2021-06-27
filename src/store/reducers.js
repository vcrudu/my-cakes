import { combineReducers } from 'redux';

import {
  UPDATE_CAKES_LIST,
  UPDATE_CURRENT_CAKE,
  UPDATE_CURRENT_SCREEN
} from './actions';


function cakesList(state = [], action) {
  switch (action.type) {
    case UPDATE_CAKES_LIST:
      return [ ...state, ...action.cakesList];
    default:
      return state;
  }
}

function currentCake(state = {}, action) {
  switch (action.type) {
    case UPDATE_CURRENT_CAKE:
      if(!action.currentCake) return {};
      return { ...state, ...action.currentCake};
    default:
      return state;
  }
}

function currentScreen(state = "", action) {
  switch (action.type) {
    case UPDATE_CURRENT_SCREEN:
      return action.currentScreen;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cakesList, currentCake, currentScreen
});

export default rootReducer;
