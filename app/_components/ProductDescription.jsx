import React, { useEffect, useState } from "react";

const ProductDescription = ({ editedDescription }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: editedDescription }} />
  );
};

export default ProductDescription;
