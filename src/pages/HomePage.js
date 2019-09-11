import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main role="main">
      <h1>University of Toronto Course Reviews</h1>
      <h2>Select Your Campus:</h2>
      <ul>
        <li>
          <Link to="/explore/utm">University of Toronto Mississauga</Link>
        </li>
        <li>
          <Link to="/explore/utsc">University of Toronto Scarborough</Link>
        </li>
        <li>
          <Link to="/explore/utsg">University of Toronto St. George</Link>
        </li>
      </ul>
    </main>
  );
}
