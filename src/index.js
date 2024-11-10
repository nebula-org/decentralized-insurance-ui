import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { cookieToInitialState } from "@account-kit/core";
import { config } from './config.js';
import { Providers } from './providers.js';

const originalSetItem = localStorage.setItem;

localStorage.setItem = function (key, value) {
  const event = new Event('itemInserted');

  event.value = value; // Optional..
  event.key = key; // Optional..

  document.dispatchEvent(event);

  originalSetItem.apply(this, arguments);
};
const initialState = cookieToInitialState(
  config,

);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Providers initialState={initialState}><App /></Providers>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
