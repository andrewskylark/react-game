import style from './style.module.css';

import Header from '../../components/header';
import Layout from '../../components/layout';
import Footer from '../../components/footer';

import bg2 from '../../assets/bg1.jpeg';
import bg1 from '../../assets/bg3.jpeg';
import PokemonCard from '../../components/pokemonCard';
import CARDSDATA from '../../components/pokemonCard/cardsData.json';
import MenuHeader from '../../components/menuHeader';

const HomePage = ({ onChangePage }) => {
  const onClickBtn = (page) => {
    onChangePage && onChangePage(page);
  }
  return (
    <>
      <MenuHeader
      />
      <Header
        title="This is title"
        descr="This is Description!"
        onClickBtn={onClickBtn}
      />
      <Layout
        title="This is title"
        id="rules"
        urlBg={bg1}
      >
        <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.
        </p>
        <p>Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.
        </p>
        <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared. If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead.
        </p>
      </Layout>
      <Layout
        title="This is title"
        id="cards"
        colorBg="tomato"
      >
        <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.
        </p>
        <p>Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.
        </p>
        <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared. If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead.
        </p>

        <div className={style.flex}>
          {
            CARDSDATA.map((item) => <PokemonCard
              key={item.id}
              name={item.name}
              img={item.img}
              id={item.id}
              type={item.type}
              values={item.values}
            />)
          }
        </div>
      </Layout>
      <Layout
        title="This is title"
        id="about"
        urlBg={bg2}
      >
        <p>In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.
        </p>
        <p>Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.
        </p>
        <p>To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared. If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead.
        </p>
      </Layout>
      <Footer
        title="This is title"
        descr="This is Description!"
      />
    </>
  );
}

export default HomePage;
