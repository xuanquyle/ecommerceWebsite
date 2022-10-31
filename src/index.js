import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';

import PageContent from './components/ProductDetails/PageContent';
import LaptopPage from './components/Laptop/LaptopPage';
import Main from './components/Main/Main';
import ScrollToTop from './components/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="Laptop" element={<LaptopPage />} />
          <Route path="SmartPhone" element={<PageContent />} />
          <Route path="Accessory" element={<PageContent />} />
          <Route path="ProductDetails" element={<PageContent />} />
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
