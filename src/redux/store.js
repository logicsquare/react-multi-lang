import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk";
import { loaderDataReducer, userDataReducer } from './reducers';
import { languageDataReducer } from "./reducers/language-data";

const rootReducer = combineReducers({
    userData: userDataReducer,
    loaderData: loaderDataReducer,
    languageData: languageDataReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    keyPrefix: "",
    stateReconciler: hardSet,
    blacklist: ['loaderData']
}

const pReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(
    pReducer,
    undefined,
    composeEnhancers(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
