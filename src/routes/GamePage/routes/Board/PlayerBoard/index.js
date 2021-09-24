import { useState } from 'react';
import cn from 'classnames';
import PokemonCard from '../../../../../components/pokemonCard';
import s from './style.module.css';

const PlayerBoard = ({className, player, cards, onClickCard}) => {
    const [isSelected, setSelected] = useState(null);
    return (
        <>
            {
                cards.map((item) => (
                    <div 
                        className={cn(className, s.cardBoard, {
                            [s.selected]: isSelected === item.id
                        })}
                        onClick={() => {
                            setSelected(item.id);
                            onClickCard && onClickCard({
                                player,
                                ...item,
                            });
                        }}
                    >
                        <PokemonCard
                            key={item.id}
                            name={item.name}
                            img={item.img}
                            id={item.id}
                            type={item.type}
                            values={item.values}
                            isActive
                            minimize
                        />
                    </div>
                ))
            }
        </>
    );
};

export default PlayerBoard;