import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { backendApi } from 'services/apiService';

const reducers = combineReducers({
	[backendApi.reducerPath]: backendApi.reducer,
});

const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(backendApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
