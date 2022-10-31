import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";

import "../assets/css/style.css";
import "../assets/css/bootstrap.min.css";
//import "../assets/css/plugins/owl-carousel/owl.carousel.css";
import "../assets/css/plugins/magnific-popup/magnific-popup.css";
import "../assets/css/plugins/jquery.countdown.css";

import "../assets/css/skins/skin-demo-4.css";
import "../assets/css/demos/demo-4.css";

import {Outlet} from "react-router-dom";

// import OwlCarousel from "react-owl-carousel";
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <main className="main">         
          <Outlet />
        </main>
        <Footer />
      </header>
    </div>
  );
}

export default App;
