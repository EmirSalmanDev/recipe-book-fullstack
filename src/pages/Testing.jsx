import React from "react";
// Landing
import styled from "styled-components";

const StyledBtn = styled.button`
  font-size: 1.5rem;
  background: red;
  color: white;
`;

const Testing = () => {
  return (
    <div>
      <h1>Testing Page</h1>
      <StyledBtn>styled button</StyledBtn>
    </div>
  );
};

export default Testing;
