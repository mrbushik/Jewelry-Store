import React from "react";
import "./App.css";
import NavBar from "./Components/Navigation/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import MainPage from "./Components/Pages/mainPage";
import MensPage from "./Components/Pages/mensPage";
import WomanPage from "./Components/Pages/womanPage";
import Cart from "./Components/Pages/cart";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/cart" component={Cart} />
        <Route path="/mens" component={MensPage} />
        <Route path="/woman" component={WomanPage} />
        <Route path="/" component={MainPage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
