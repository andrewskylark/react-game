import { useState } from "react";
import HomePage from "./routes/Home";
import GamePage from "./routes/Game";

const App = () => {
  const [page, setPage] = useState('app');

  const onChangePage = (page) => {
    setPage(page);
  }
  
  switch (page) {
    case "app":
      return <HomePage onChangePage={onChangePage}/>
    case "game":
      return <GamePage onChangePage={onChangePage}/>
  
    default:
      return <HomePage />
  }
};

export default App;