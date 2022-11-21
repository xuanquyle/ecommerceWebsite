import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import "../assets/css/skins/skin-demo-4.css";
import "../assets/css/demos/demo-4.css";

import { Outlet } from "react-router-dom";
import { connect } from 'react-redux';

function usePageViews() {
  let location = useLocation()
  console.log('check page change', location.pathname)
  useEffect(
    () => {
      // console.log('check page change', location.pathname)
      // ga.send(['pageview', location.pathname])
    },
    [location]
  )
}


function MainPage(props) {
  usePageViews()
  useEffect(() => {
    console.log("props",props.user)
  },[props.user])
  
  return (
    <>
    
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const mapStateToProp = state => {
  return {
      user: state.userLogin
  }
}
export default connect(mapStateToProp)(MainPage);