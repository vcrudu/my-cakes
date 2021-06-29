import { combineReducers } from 'redux';
import Cake from '../api/dataObjects/Cake'

import {
  UPDATE_CAKES_LIST,
  UPDATE_CURRENT_CAKE,
  UPDATE_CURRENT_SCREEN,
  DELETE_CAKE
} from './actions';


function cakesList(state:Array<Cake> = [], action: any) {
  switch (action.type) {
    case UPDATE_CAKES_LIST:
      return [...action.cakesList];
    case DELETE_CAKE:
      const newState = [...state.filter(cake=>cake.id!==action.id)]
      return newState
    default:
      return state;
  }
}

function currentCake(state = {}, action: any) {
  switch (action.type) {
    case UPDATE_CURRENT_CAKE:
      if(!action.currentCake) return {};
      return { ...state, ...action.currentCake};
    default:
      return state;
  }
}

function currentScreen(state = "", action: any) {
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
