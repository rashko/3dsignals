import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Books from "./pages/books";
import Categories from "./pages/categories/index";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/books/" component={Books} />
        <Route path="/categories/" component={Categories} />
        <Redirect from="/" to="/categories/" />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
