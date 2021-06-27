const UPDATE_CAKES_LIST = 'UPDATE_CAKES_LIST';
const UPDATE_CURRENT_CAKE = 'UPDATE_CURRENT_CAKE';
const UPDATE_CURRENT_SCREEN = 'UPDATE_CURRENT_SCREEN';

function updateCakesList(cakesList) {
  return {
    type: UPDATE_CAKES_LIST,
    cakesList,
  };
}

function updateCurrentCake(currentCake) {
  return {
    type: UPDATE_CURRENT_CAKE,
    currentCake,
  };
}

function updateCurrentScreen(currentScreen) {
  return {
    type: UPDATE_CURRENT_SCREEN,
    currentScreen,
  };
}

export { UPDATE_CAKES_LIST, UPDATE_CURRENT_CAKE, UPDATE_CURRENT_SCREEN }; //Actions
export { updateCakesList, updateCurrentCake, updateCurrentScreen }; //Actions creators