import { configureStore } from '@reduxjs/toolkit'; 
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './AuthSlice'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}; 
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
      auth:persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { 
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
