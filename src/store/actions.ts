import Cake from '../api/dataObjects/Cake'
const UPDATE_CAKES_LIST = 'UPDATE_CAKES_LIST';
const UPDATE_CURRENT_CAKE = 'UPDATE_CURRENT_CAKE';
const DELETE_CAKE = 'DELETE_CAKE';
const UPDATE_CURRENT_SCREEN = 'UPDATE_CURRENT_SCREEN';

function updateCakesList(cakesList: Array<Cake>) {
  return {
    type: UPDATE_CAKES_LIST,
    cakesList,
  };
}

function updateCurrentCake(currentCake: Cake) {
  return {
    type: UPDATE_CURRENT_CAKE,
    currentCake,
  };
}

function deleteCake(id: string) {
  return {
    type: DELETE_CAKE,
    id,
  };
}

function updateCurrentScreen(currentScreen: string) {
  return {
    type: UPDATE_CURRENT_SCREEN,
    currentScreen,
  };
}

export { UPDATE_CAKES_LIST, UPDATE_CURRENT_CAKE, UPDATE_CURRENT_SCREEN, DELETE_CAKE }; //Actions
export { updateCakesList, updateCurrentCake, updateCurrentScreen, deleteCake }; //Actions creators