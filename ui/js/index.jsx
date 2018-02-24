import React, { PropTypes } from 'react'
import thunk from 'redux-thunk'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux';
import { Provider, connect } from 'react-redux'

import {cinemasSchedules, fetchCinemaSchedules} from './reducers/cinema_schdule.js'
import CinemaView from './components/cinema_view.jsx'


// Containers
function mapStateToPropsContainer(state) {
  return {
    schedules: state.schedules
  };
}

function mapDispatchToPropsContainer(dispatch) {
  return {
    onDateChange: (date) => dispatch(fetchCinemaSchedules(date))
  }
}

let App = connect(
  mapStateToPropsContainer,
  mapDispatchToPropsContainer
)(CinemaView);

let store = createStore(
  cinemasSchedules,
  applyMiddleware(thunk)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);