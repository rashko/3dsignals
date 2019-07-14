import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Books from "./pages/books/index";
import Categories from "./pages/categories/index";
import Header from "./components/header";
import Footer from "./components/footer";

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className={"container"}>
          <Route path="/books/" component={Books} />
          <Route path="/categories/" component={Categories} />
          <Route
            exact
            path="/"
            render={() => <Redirect from="/" to="/books/" />}
          />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
