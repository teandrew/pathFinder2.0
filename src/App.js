import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import CoursePage from "./pages/CoursePage";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Router>
      <header>
        <nav>Path Finder</nav>
      </header>
      <Route exact path="/" component={HomePage} />
      <Route path="/explore/:campus" component={ExplorePage} />
      <Route path="/courses/:courseCode" component={CoursePage} />
      <Route path="/404" component={NotFoundPage} />
    </Router>
  );
}
