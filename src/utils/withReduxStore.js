import { connect } from 'react-redux';
import {
  updateCakesList,
  updateCurrentCake,
  updateCurrentScreen
} from '../store/actions';

export default function withReduxStore(WrappedComponent) {
  const mapStateToProps = (state) => {
    return {
      cakesList: state.cakesList,
      currentCake: state.currentCake,
      currentScreen: state.currentScreen
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      updateCakesList: (cakesList) =>
        dispatch(updateCakesList(cakesList)),
      updateCurrentCake: (currentCake) =>
        dispatch(updateCurrentCake(currentCake)),
      updateCurrentScreen: (currentScreen) =>
        dispatch(updateCurrentScreen(currentScreen)),
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
}
