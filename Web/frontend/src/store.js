
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// The root reduced is index.js in the reducers directory
import rootReducer from './reducers';

// Used to set up the state and the tools for edditing the state
const initialState = {};
const middleware = [thunk];

// The store holds all of the information and state of our application
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;