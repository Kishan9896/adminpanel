import { Route, Switch } from "react-router-dom";
import Layout from "./component/Layout";
import Medicines from "./container/Medicines/Medicines";
import Patient from "./container/Patient/Patient";
import { Provider } from "react-redux";
import Counter from "./container/Counter";
import configureStore from "./container/redux/reducer/store";
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Switch>
            <Route path="/medicines" exact component={Medicines} />
            <Route path="/patient" exact component={Patient} />
            <Route path="/counter" exact component={Counter} />
          </Switch>
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default App;
