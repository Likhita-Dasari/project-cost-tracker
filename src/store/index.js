import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import itemsReducer from './itemsSlice'
import otherCostsReducer from './otherCostsSlice'
import persistenceMiddleware from './persistenceMiddleware';
import loadState from './loadState';

// Load initial state from localStorage
const preloadedState = loadState();

const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    otherCosts: otherCostsReducer,
  },
  preloadedState: preloadedState || {}, // Use preloaded state if it exists, otherwise empty object
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistenceMiddleware),
})

export default store
