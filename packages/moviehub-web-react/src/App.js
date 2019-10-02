import React from "react";
import "./App.css";
import MoviesRepository from "./repositories/MoviesRepository";

function App() {
  return (
    <div className="container">
      <div className="row">
        <MoviesRepository />
      </div>
    </div>
  );
}

export default App;
