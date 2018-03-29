import React from "react";

const Jumbotron = ({ children }) =>
  <div style={{ height: 150, clear: 'both' }} className="jumbotron">
    {children}
  </div>;

export default Jumbotron;
