import React from 'react';
import 'antd/dist/antd.min.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from "react-redux";
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./redux/store"
import { Elements } from '@stripe/react-stripe-js';
import { stripe } from './lib/stripe';
import {queryClient,QueryClientProvider} from '@tanstack/react-query'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <Elements stripe={stripe}>
   <App />
   </Elements>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
