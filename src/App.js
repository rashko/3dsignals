import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Books from "./pages/books/index";
import Categories from "./pages/categories/index";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/books/" component={Books} />
        <Route path="/categories/" component={Categories} />
        <Route exact path="/" render={() => <Redirect from="/" to="/books/" />} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
