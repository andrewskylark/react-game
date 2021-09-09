import Header from './components/header';
import Layout from './components/layout';
import Footer from './components/footer';

import bg1 from './assets/bg3.jpeg';
import bg2 from './assets/bg1.jpeg';

const App = () => {
  return (
    <>
      <Header 
        title="This is title"
        descr="This is Description!"
      />
      <Layout 
        title="This is title"
        descr="This is Description!"
        urlBg={ bg1 }
      />
       <Layout 
        title="This is title"
        descr="This is Description!"
        colorBg="tomato"
      />
       <Layout 
        title="This is title"
        descr="This is Description!"
        urlBg={ bg2 }
      />
       <Footer 
        title="This is title"
        descr="This is Description!"
      />
    </>
  );
}

export default App;
