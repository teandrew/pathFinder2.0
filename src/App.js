import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";

export default function App() {
  return (
    <Router>
      <div>
        <header>
          <nav>Course Finder</nav>
        </header>
        <Route exact path="/" component={HomePage} />
        <Route path="/explore/:campus" component={ExplorePage} />
        <Route path="/courses/:code" component={HomePage} />
      </div>
    </Router>
  );
}
