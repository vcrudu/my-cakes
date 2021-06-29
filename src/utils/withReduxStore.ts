import { connect } from 'react-redux';
import {
  updateCakesList,
  updateCurrentCake,
  updateCurrentScreen,
  deleteCake
} from '../store/actions';
import Cake from '../api/dataObjects/Cake'

export default function withReduxStore(WrappedComponent: any) {
  const mapStateToProps = (state: any) => {
    return {
      cakesList: state.cakesList,
      currentCake: state.currentCake,
      currentScreen: state.currentScreen
    };
  };

  const mapDispatchToProps = (dispatch: any) => {
    return {
      updateCakesList: (cakesList: Array<Cake>) =>
        dispatch(updateCakesList(cakesList)),
      updateCurrentCake: (currentCake: Cake) =>
        dispatch(updateCurrentCake(currentCake)),
      updateCurrentScreen: (currentScreen: string) =>
        dispatch(updateCurrentScreen(currentScreen)),
      deleteCake: (id: string) =>
        dispatch(deleteCake(id)),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
