import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import cn from 'classnames';

import MenuHeader from "./components/menuHeader";
import Footer from "./components/footer";

import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";
import AboutPage from "./routes/AboutPage";
import ContactsPage from "./routes/ContactsPage";
import NotFoundPage from "./routes/NotFoundPage";

import s from "./App.module.css"

const App = () => {
  const location = useLocation();
  const isPadding = location.pathname === '/' || location.pathname === '/game/board';
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
                <Route path="/game" component={GamePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/contacts" component={ContactsPage} />
                <Route render={() => (
                  <Redirect to="/404" />
                )} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
    </Switch>

  )
};

export default App;