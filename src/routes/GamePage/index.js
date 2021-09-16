import s from './style.module.css';
import Btn from '../../components/btn';
import PokemonCard from '../../components/pokemonCard';
import CARDSDATA from '../../components/pokemonCard/cardsData.json';

import { useState } from 'react';

const POKEMONS = CARDSDATA.map(pokemon => {
    Object.assign(pokemon, {'active': false})
    return pokemon;
})

const GamePage = () => {
    const [pokemons, setPokemons] = useState(POKEMONS).slice(0, 5);

    const onClickPokemon = (id) => {
        setPokemons(prevState =>
            prevState.map(
                item => item.id === id ?
                {...item, active: !item.active} :
                item
                
            )    
        )
    }
    return (
        <div className={s.page}>
            <h1>GAMEPAGE</h1>
            <div className={s.flex}>
          {
            pokemons.map((item) => <PokemonCard
              key={item.id}
              name={item.name}
              img={item.img}
              id={item.id}
              type={item.type}
              values={item.values}
              isActive={item.active}
              onClickPokemon={onClickPokemon}
            />)
          }
        </div>
            <Btn 
                text="Back to Home Page"
                route=""
            />
        </div>
    );
};

export default GamePage;