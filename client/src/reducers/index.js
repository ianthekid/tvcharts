import { combineReducers } from 'redux';

const scaleReducer = (state = 1, action) => {
  switch(action.type) {
    case 'RESIZE':
      return action.payload
    default:
      return state;
  }
}

const showReducer = (state = '', action) => {
  switch(action.type) {
    case 'SHOW':
      return action.payload
    default:
      return state;
  }
}

const seasonsReducer = (state = [], action) => {
  switch(action.type) {
    case 'SEASONS':
      return action.payload
    default:
      return state;
  }
}

//check local storage for colorblind preference
var cbPref = JSON.parse(localStorage.getItem('cbPref')) || false;

const colorblindReducer = (state = cbPref, action) => {
  switch(action.type) {
    case 'COLOR_BLIND':
      //persist state to localStorage
      localStorage.setItem('cbPref', action.payload);
      return action.payload;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  scale: scaleReducer,
  show: showReducer,
  seasons: seasonsReducer,
  colorblind: colorblindReducer
});

export default rootReducer;