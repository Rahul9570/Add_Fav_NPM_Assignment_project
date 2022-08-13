import React from "react";

import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <center>
        <h1>Welcome to favorite NPM packages</h1>
      </center>
      <center>
        <Link to="AddNpm">
          <button>Add Fav</button>
        </Link>
      </center>
    </div>
  );
}
export default Home;
