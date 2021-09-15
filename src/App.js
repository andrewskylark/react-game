import {useRouteMatch, Route, Switch} from "react-router-dom"
import cn from 'classnames';

import MenuHeader from "./components/menuHeader";
import Footer from "./components/footer";

import HomePage from "./routes/HomePage";
import GamePage from "./routes/GamePage";
import AboutPage from "./routes/AboutPage";
import ContactPage from "./routes/ContactPage";
import NotFoundPage from "./routes/NotFoundPage";

import s from "./app.module.css"

const App = () => {
  const match = useRouteMatch('/');
  return (
      <Switch>
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
                <Route path="/contact" component={ContactPage} />
              </Switch>
            </div>
            <Footer />
          </>
        </Route>
        
        <Route component={NotFoundPage} />    
      </Switch>
  )
};

export default App;