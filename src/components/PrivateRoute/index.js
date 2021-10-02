import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
  
    return (
        <Route
        {...rest}
        render={ props =>
            localStorage.getItem('idToken') ?
            <Component {...props} /> :
            <Redirect to="/" />
        }//idToken set into local storage upon log in, if no token redirect to home
        />
    );
};

export default PrivateRoute;