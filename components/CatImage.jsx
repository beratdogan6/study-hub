"use client";

import React from "react";

const CatImage = ({ x, y, imageUrl, id }) => {
  const style = {
    position: "absolute",
    left: x + "px",
    top: y + "px",
    display: "block",
    width: "250px",
    height: "250px",
  };

  return <img src={imageUrl} alt={`Cat Image ${id}`} style={style} />;
};

export default CatImage;
