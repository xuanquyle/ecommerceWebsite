import React from 'react';
import ReactDOM from 'react-dom/client';


import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import "./utils/constant"
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
// import "./assets/css/plugins/magnific-popup/magnific-popup.css";
// import "./assets/css/plugins/jquery.countdown.css";
// require('dotenv').config()



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
