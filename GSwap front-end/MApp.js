import React from "react";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
  NavLink,
  HashRouter,
} from "react-router-dom";

import Home from "./App";
import Lottery from "./pages/Lottery";
import About from "./pages/About";
import Stake from "./pages/Staking";
import Swap from "./pages/Swap";
import NavBar from "./NavBar";

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <main>
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <About />
            </Route>
            <Route path="/stake" exact>
              <Stake />
            </Route>
            <Route path="/farms" exact>
              <Home />
            </Route>
            <Route path="/lottery" exact>
              <Lottery />
            </Route>
            {/* <Route path="/swap" exact>
              <Swap />
            </Route> */}
            <Redirect to="/" />
          </Switch>
        </main>
      </HashRouter>
    );
  }
}

export default App;
