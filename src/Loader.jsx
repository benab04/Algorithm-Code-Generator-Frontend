import React from "react";
import "./styles/Loader.css";
function Loader() {
  return (
    <div className="loader-div">
      <div>
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </div>
      <div>
        <h4 style={{ color: "#444" }}>Waiting for server to respond</h4>
      </div>
    </div>
  );
}

export default Loader;
