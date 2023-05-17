import React, { useState, useEffect } from "react";
import NavBar from "./Components/navigation/navBar";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import MainPage from "./Components/pages/mainPage";
import MansPage from "./Components/pages/mansPage";
import WomanPage from "./Components/pages/womanPage";
import Cart from "./Components/pages/cart";
import OrderPage from "./Components/pages/orderPage";
import AdminPanel from "./Components/pages/adminPanel";
import ProductPage from "./Components/pages/productPage";
import Login from "./Components/pages/login";
import AdminProducts from "./Components/pages/adminProducts";
import EditProduct from "./Components/ui/editProduct";

const App: React.FC = () => {
  //  check login status and delete navBar in some cases

  let location: any = useLocation();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    location.pathname === "/login" || location.pathname === "/adminpanel"
      ? setIsLogin(true)
      : setIsLogin(false);
  }, [location]);
  return (
    <>
      {!isLogin && <NavBar />}
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/adminProducts/:Id" component={EditProduct} />
        <Route path="/adminProducts" component={AdminProducts} />
        <Route path="/adminPanel" component={AdminPanel} />
        <Route path="/order" component={OrderPage} />
        <Route path="/cart" component={Cart} />
        <Route path="/mans/:Id" component={ProductPage} />
        <Route path="/mans" component={MansPage} />
        <Route path="/woman/:Id" component={ProductPage} />
        <Route path="/woman" component={WomanPage} />
        <Route path="/" component={MainPage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
