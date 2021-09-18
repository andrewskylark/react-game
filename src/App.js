import {useRouteMatch, Route, Switch, Redirect} from "react-router-dom";
import cn from 'classnames';

import MenuHeader from "./components/menuHeader";
import Footer from "./components/footer";

import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";
import AboutPage from "./routes/AboutPage";
import ContactsPage from "./routes/ContactsPage";
import NotFoundPage from "./routes/NotFoundPage";

import s from "./app.module.css"

const App = () => {
  const match = useRouteMatch('/');
  return (
      <Switch>
         <Route path="/404" component={NotFoundPage} />  
        <Route>
          <>
            <MenuHeader bgActive={!match.isExact}/>
            <div className={cn(s.wrapper, {
              [s.isHomePage]: match.isExact
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