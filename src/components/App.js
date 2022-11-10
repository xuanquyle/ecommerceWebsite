import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import "../assets/css/skins/skin-demo-4.css";
import "../assets/css/demos/demo-4.css";

import { Outlet } from "react-router-dom";

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
