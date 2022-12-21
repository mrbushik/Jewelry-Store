import React from "react";
import "./App.css";
import NavBar from "./Components/navigation/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import MainPage from "./Components/pages/mainPage";
import MansPage from "./Components/pages/mansPage";
import WomanPage from "./Components/pages/womanPage";
import Cart from "./Components/pages/cart";
import OrderPage from "./Components/pages/orderPage";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Switch>
          <Route path='/order' component={OrderPage} />
        <Route path="/cart" component={Cart} />
        <Route path="/mans" component={MansPage} />
        <Route path="/woman" component={WomanPage} />
        <Route path="/" component={MainPage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
