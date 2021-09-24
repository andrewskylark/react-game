import { useRouteMatch, Switch, Route } from "react-router-dom";
import {PokemonContext} from "../../context/pokemonContext";
import { useState } from "react";

import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";

const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({});
    const match = useRouteMatch();

    const clearContextPokemons = () => {
        setSelectedPokemons(prevState => prevState = {});
        setPlayer2(prevState => prevState = []);
    }// clears context of pokemons

    const onSelectedPokemons = (key, pokemon) => {
        setSelectedPokemons(prevState => {
            if (prevState[key]) {
                const copyState = {...prevState};
                delete copyState[key];

                return copyState;
            }
            return {
                ...prevState,
                [key]: pokemon,
            }
        })
    }
    const [player2Cards, setPlayer2] = useState([]);
    const getPlayer2Cards = (player2) => {
        return setPlayer2(prevState => prevState = [...player2]);
    }

   
    return (
        <PokemonContext.Provider value={{
            pokemons: selectedPokemons,
            player2Cards: player2Cards,
            onPlayer2GetPokes: getPlayer2Cards,
            onSelectedPokemons: onSelectedPokemons,
            clearContext: clearContextPokemons,
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