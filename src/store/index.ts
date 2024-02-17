import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import widgetReducer from './widget'
import messageReducer from './messages'

const persistConfig = {
  key: 'runelab-bot',
  storage,
  blacklist: [],
}

const reducers = combineReducers({
  widgetState: widgetReducer,
  messageState: messageReducer,
})
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
})
export const persistor = persistStore(store)
