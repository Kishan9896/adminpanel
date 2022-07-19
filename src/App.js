import { Route, Switch } from "react-router-dom";
import Layout from "./component/Layout";
import Medicines from "./container/Medicines/Medicines";
import Patient from "./container/Patient/Patient";
import { Provider } from "react-redux";
import Counter from "./container/Counter";

function App() {
  return (
    <Provider store= {store}>
      <Layout>
        <Switch>
          <Route path="/medicines" exact component={Medicines} />
          <Route path="/patient" exact component={Patient} />
          <Route path="/counter" exact component={Counter} />
        </Switch>
      </Layout>
    </Provider>
  );
}

export default App;
