import { Spinner } from "react-bootstrap";

import React from "react";

const Loader = () => {
  return (
    <Spinner
      animation="boarder"
      role="status"
      style={{
        width: "100px",
        height: "100px",
        display: "block",
      }}
    />
  );
};

export default Loader;
