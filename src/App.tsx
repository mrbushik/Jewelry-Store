import React from "react";
import "./App.css";
import NavBar from "./Components/Navigation/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import MainPage from "./Components/Pages/mainPage";
import Footer from "./Components/Footer/footer";
import MensPage from "./Components/Pages/mensPage";
import WomanPage from "./Components/Pages/womanPage";

const App: React.FC = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/mens" component={MensPage} />
        <Route path="/woman" component={WomanPage} />
        <Route path="/" component={MainPage} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
