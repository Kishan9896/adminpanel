import { Route, Switch } from "react-router-dom";
import Layout from "./component/Layout";
import Medicines from "./container/Medicines/Medicines";
import Patient from "./container/Patient/Patient";


function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/medicines" exact component={Medicines}/>
        <Route path="/patient" exact component={Patient} />
      </Switch>
    </Layout>    
  );
}

export default App;
