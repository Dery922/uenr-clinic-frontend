// Import jQuery and make it global **before Bootstrap**

// import $ from 'jquery';


// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import 'bootstrap/dist/css/bootstrap.min.css';




import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/reducers';

import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
// window.$ = $;
// window.jQuery = $;



const store = createStore(rootReducer, composeWithDevTools());



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
    <BrowserRouter>
     <App />
    </BrowserRouter>
   </Provider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
