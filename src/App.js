import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import HomePage from './pages/home-page';
import ProtectedRoute from './components/protected-routes';
import LoginPage from './pages/login-page';
import FullPageLoader from "./containers/full-page-loader";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from "react-toasts";
import MultiLang from "./multi-lang";
import en from "./multi-lang/langs/en";
import sp from "./multi-lang/langs/sp";
import { getCurrentLangFromRedux } from "./helper-methods";

// Initialize multi lang
MultiLang.setLangModules({
  en, sp
});
// Set default lang
MultiLang.setDefaultLang("en");
// Set current lang
// MultiLang.setCurrentLang(getCurrentLangFromRedux());
MultiLang.setCurrentLang("sp");

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div></div>} persistor={persistor}>
        <Router>
          <div>
            <FullPageLoader></FullPageLoader>
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} />
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <ProtectedRoute exact path="*" component={HomePage} redirectRoute="/login" /> */}
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
