import { useRouteMatch, Switch, Route } from "react-router-dom";
import {PokemonContext} from "../../context/pokemonContext";
import { useState } from "react";

import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";

const GamePage = () => {
    const match = useRouteMatch();
    const [win, setWin] = useState(false);

    return (
        <PokemonContext.Provider value={{
            win: win,
            setWin: setWin,
        }}>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage} />
                <Route path={`${match.path}/board`} component={BoardPage} />
                <Route path={`${match.path}/finish`} component={FinishPage} />
            </Switch>
        </PokemonContext.Provider>
    );
};

export default GamePage;