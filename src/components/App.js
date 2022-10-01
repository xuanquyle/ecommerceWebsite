import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

import "../assets/css/style.css";
import "../assets/css/bootstrap.min.css";
//import "../assets/css/plugins/owl-carousel/owl.carousel.css";
import "../assets/css/plugins/magnific-popup/magnific-popup.css";
import "../assets/css/plugins/jquery.countdown.css";

import "../assets/css/skins/skin-demo-4.css";
import "../assets/css/demos/demo-4.css";


// import OwlCarousel from "react-owl-carousel";
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Main />
        <Footer />
      </header>
    </div>
  );
}

export default App;
