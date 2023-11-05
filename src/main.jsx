import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/Store/store.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="bg-gray-100 w-screen h-[calc(100vh)] overflow-auto relative">
          <App />
        </div>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
