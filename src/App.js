import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import cn from 'classnames';

import MenuHeader from "./components/menuHeader";
import Footer from "./components/footer";
import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";
import AboutPage from "./routes/AboutPage";
import ContactsPage from "./routes/ContactsPage";
import UserPage from "./routes/UserPage";
import NotFoundPage from "./routes/NotFoundPage";

import s from "./App.module.css"
import PrivateRoute from "./components/PrivateRoute";
import { getUserAsync, selectUserLoading } from "./store/user";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isUserLoading = useSelector(selectUserLoading);
  const isPadding = location.pathname === '/' || location.pathname === '/game/board';
  
  useEffect(() => {
    dispatch(getUserAsync())
  }, []);

  if (isUserLoading) {
    return 'Loading';
  }

  return (
    <Switch>
        <Route path="/404" component={NotFoundPage} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div className={cn(s.wrapper, {
              [s.isHomePage]: isPadding
            })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/home" component={HomePage} />
                <Route path="/user" component={UserPage} />
                <PrivateRoute path="/game" component={GamePage} />
                <PrivateRoute path="/about" component={AboutPage} />
                <PrivateRoute path="/contacts" component={ContactsPage} />
                <Route render={() => (
                  <Redirect to="/404" />
                )} />
              </Switch>
            </div>
            <NotificationContainer/>
            <Footer />
          </>
        </Route>
    </Switch>
  )
};

export default App;